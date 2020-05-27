import React, { FC, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Grid, Box, ResponsiveContext } from "grommet";
import Directory from "../components/directory";
import Item from "../components/item";

// import { Collection, CollectionItem } from "../shop.data";
import { Collection, CollectionItem, Product } from "../interfaces";

interface IProps {}



const Shop: FC<IProps> = () => {
  const [collections, setCollection] = useState<Collection[]>([]);
  const [products, setProduct] = useState<Product[]>([])

  const { category, query = "" } = useParams();

  useEffect(() => {
    const localStorageCollections = localStorage.getItem("collection");
    if (localStorageCollections) {
      setCollection(JSON.parse(localStorageCollections));
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/api/product')
    .then(res => {
        console.log('data', res.data)
        setProduct(res.data)
        // let products = res.data
        // let categories = products.map((product: { kategori: string; }) => ({ value: product.kategori }))
        // console.log('kategorier', categories) 
    })
    .catch(err => {
        console.log(err)
    })
}, [])


 
  const getCurrentCollectionItems = (): CollectionItem[] => {
    if (collections.length) {
      const col = collections.find(
        (collection) => collection.routeName === category
      );
      if (col) return col.items;
    }
    return [];
  };

  const matchWithQuery = (item: CollectionItem): boolean =>
    item.name.toLowerCase().includes(query.trim().toLowerCase());

  const size = useContext(ResponsiveContext) as
    | "small"
    | "medium"
    | "large"
    | "xlarge";

  const columns = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"]
  };

  const rows = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"]
  };

  const areas = {
    small: [{ name: "main", start: [0, 0], end: [0, 0] }],
    medium: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] }
    ],
    large: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] }
    ],
    xlarge: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] }
    ]
  };
  const main = (
    <Box
      key="0"
      style={{
        gridArea: "main",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "small",
        justifyContent: "center",
        overflowY: "scroll"
      }}
    >
      {category === "search" && query
        ? collections.map((collection: Collection) =>
            collection.items
              .filter(matchWithQuery)
              .map((item: CollectionItem) => <Item key={item.id} item={item} />)
          )
        : getCurrentCollectionItems().map((item: CollectionItem) => (
            <Item key={item.id} item={item} />
          ))}
    </Box>
  );
  const directory = <Directory key="1" />;

  const components = {
    small: [main],
    medium: [main, directory],
    large: [main, directory],
    xlarge: [main, directory]
  };
  return (
    <div>
      {products.map((product, i) => (
            <div className="recipeBoxStyle" key={i}>
              <h3 style={{ textAlign: "center" }}>{product.name}</h3>
              <p>PRIS: {product.price}</p>
              <p>KATEGORI: {product.category}</p>
              <p>SÄSONG: {product.season}</p>
              <p>{product.imageUrl}</p>
              <p>BESKRIVNING: {product.description}</p>
            </div>
          ))}

    <Grid
      fill
      responsive={true}
      areas={areas[size]}
      columns={columns[size]}
      rows={rows[size]}
      gap="small"
    >
      {components[size]}
    </Grid>
    </div>
  );
};

export default Shop;
