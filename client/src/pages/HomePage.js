import React, { useCallback, useContext, useEffect, useState } from "react";
import "./HomePage.css";
import {Card, Space, Table, Tag} from "antd";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
const { Meta } = Card;

// сделать отдельный компонент CollectionsList и использовать его в HomePage & CollectionsPage

// const collections = [
//   {
//     date: "2022-07-01T10:42:08.696Z",
//     description: "description",
//     image: "",
//     name: "name",
//     owner: "62bb2d754d63ee5a0b8331e9",
//     theme: "Jack",
//   },  {
//     date: "2022-07-01T10:42:08.696Z",
//     description: "description",
//     image: "",
//     name: "name",
//     owner: "62bb2d754d63ee5a0b8331e9",
//     theme: "Jack",
//   },  {
//     date: "2022-07-01T10:42:08.696Z",
//     description: "description",
//     image: "",
//     name: "name",
//     owner: "62bb2d754d63ee5a0b8331e9",
//     theme: "Jack",
//   },  {
//     date: "2022-07-01T10:42:08.696Z",
//     description: "description",
//     image: "",
//     name: "name",
//     owner: "62bb2d754d63ee5a0b8331e9",
//     theme: "Jack",
//   },  {
//     date: "2022-07-01T10:42:08.696Z",
//     description: "description",
//     image: "",
//     name: "name",
//     owner: "62bb2d754d63ee5a0b8331e9",
//     theme: "Jack",
//   },
// ]
const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Коллекция',
    dataIndex: 'collectionsName',
    key: 'collectionsName',
    render: (collectionsName) => (
      <Tag>{collectionsName}</Tag>
    )
  },
  {
    title: 'Автор',
    key: 'author',
    dataIndex: 'author',

  },
]
// const data = [
//   {
//     key: '1',
//     name: 'Some_Item_Name',
//     collection: 'Some_Collection',
//     author: 'Some_Collection',
//   },  {
//     key: '2',
//     name: 'Some_Item_Name',
//     collection: 'Some_Collection',
//     author: 'Some_Collection',
//   },  {
//     key: '3',
//     name: 'Some_Item_Name',
//     collection: 'Some_Collection',
//     author: 'Some_Collection',
//   },
// ];

export const HomePage = () => {
  const { request } = useHttp();
  const { token, username } = useContext(AuthContext);
  const [itemsList, setItemsList] = useState([])
  const [collections, setCollections] = useState([]);

  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request("/api/collection/top", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollections(fetched);

    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);
  
  const fetchItems = useCallback(async () => {
    try {
      const fetched = await request("/api/item/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setItemsList(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const data = itemsList.map((item) => ({
    ...item, 
    key: item._id,
    author: username,
  })).sort((a,b) => b.date > a.date ? 1 : -1).slice(0, 20)



  return (
    <div className="container">
      <h2 className="home-title">Топ 5 самых больших коллекций</h2>
      <div className="home-collections">
        {collections.map((collection, index) => {
          return (
            <Link to={`/detail/${collection._id}`}>
            <Card
              key={index}
              hoverable
              className="card"
              cover={<img alt="image" src={collection.image} />}
            >
              <Meta
                title={<div>{collection.theme}</div>}
                description={
                  <div>
                    <div>{collection.name}</div>
                    <div>{collection.description}</div>
                  </div>
                }
              />
            </Card>
            </Link>
          );
        })}
      </div>

      <h2 className="home-title">Последний добавленные айтемы</h2>
      <button type="primary" onClick={() => {console.log(data)}} style={{width: 20, height: 20, marginBottom: 16}} ></button>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
