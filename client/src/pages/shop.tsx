import React, { FC, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Box, ResponsiveContext } from "grommet";
import Directory from "../components/directory";
import Item from "../components/item";

// import { Collection, CollectionItem } from "../shop.data";
import { Collection, CollectionItem } from "../interfaces";
import { ProductHunt } from "grommet-icons";

interface IProps {}

const Shop: FC<IProps> = () => {
  const [collections, setCollection] = useState<Collection[]>([]);

  const { category, query = "" } = useParams();

  // useEffect(() => {
  //   const localStorageCollections = localStorage.getItem("collection");
  //   if (localStorageCollections) {
  //     setCollection(JSON.parse(localStorageCollections));
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/product")
      .then((res) => {
        let products = res.data;

        setCollection(
          products.map(
            (product: {
              category: string;
              name: string;
              _id: string;
              imageUrl: string;
              price: number;
              season: string[];
              inventory: Object;
              description: string;
            }) => ({
              id: 1 /* kategori id, EV SKRIVA EN IF SATS */,
              title: product.category,
              routeName: product.category,
              items: [
                {
                  id: product._id,
                  name: product.name,
                  imageUrl: product.imageUrl,
                  price: product.price,
                  size: product.inventory,
                  season: product.season,
                  description: product.description,
                },
              ],
            })
          ) //mappar om så att categorier blir routeName och passar fronte-end intefacet
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("Vår collection", collections);

  useEffect(() => {
    axios.get('http://localhost:3002/api/product')
    .then(res => {
        console.log('data', res.data)
        setCollection(res.data)
          const products = res.data
        // let categories: Collection[] = products.map((product: { category: string; name: string; id: number; imageUrl: string; price: number; season: string[]; inventory: Object; description: string;
        //  }) => ({ routeName: product.category, name: product.name, id: product.id, imageUrl: product.imageUrl, price: product.price, season: product.season, inventory: product.inventory, description: product.description })) //mappa om så man får ut alla grejer.
        // console.log('kategorier', categories) 
        const categoryArray = products.filter((product: { category: string; }) => {
          return product.category === 'Hats'
        }).map((product: { category: string; }) => product.category)
        console.log(categoryArray)

    })
    .catch(err => {
        console.log(err)
    })
}, [])


 
  const getCurrentCollectionItems = (): CollectionItem[] => {
    if (collections.length) {
      const col = collections.find((collection) => {
        console.log(collection.routeName, category);

        return collection.routeName.toLowerCase() === category!.toLowerCase();
      });
      console.log("här", col!.items);
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
    xlarge: ["auto", "auto"],
  };

  const rows = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"],
  };

  const areas = {
    small: [{ name: "main", start: [0, 0], end: [0, 0] }],
    medium: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] },
    ],
    large: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] },
    ],
    xlarge: [
      { name: "directory", start: [0, 0], end: [0, 0] },
      { name: "main", start: [1, 0], end: [1, 0] },
    ],
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
        overflowY: "scroll",
      }}
    >
      {category === "search" && query
        ? collections.map((collection: Collection) => {
            console.log(collection.items.filter(matchWithQuery));

            return collection.items
              .filter(matchWithQuery)
              .map((item: CollectionItem) => (
                <Item key={item.id} item={item} />
              ));
          })
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
    xlarge: [main, directory],
  };
  return (
    // <div>
    //   {collections.map((product, i) => (
    //     <div key={i}>
    //       <h3 style={{ textAlign: "center" }}>{product.title}</h3>
    //       <p>PRIS: {product.routeName}</p>
    //       <p>KATEGORI: {product.routeName}</p>
    //       <p>SÄSONG: {product.routeName}</p>
    //       <img src={product.routeName} />
    //       <p>BESKRIVNING: {product.routeName}</p>
    //     </div>
    //   ))}

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
    // </div>
  );
};

export default Shop;
