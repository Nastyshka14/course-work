import React from "react";
import "./HomePage.css";
import {Card, Space, Table, Tag} from "antd";
const { Meta } = Card;

// сделать отдельный компонент CollectionsList и использовать его в HomePage & CollectionsPage

const collections = [
  {
    date: "2022-07-01T10:42:08.696Z",
    description: "description",
    image: "",
    name: "name",
    owner: "62bb2d754d63ee5a0b8331e9",
    theme: "Jack",
  },  {
    date: "2022-07-01T10:42:08.696Z",
    description: "description",
    image: "",
    name: "name",
    owner: "62bb2d754d63ee5a0b8331e9",
    theme: "Jack",
  },  {
    date: "2022-07-01T10:42:08.696Z",
    description: "description",
    image: "",
    name: "name",
    owner: "62bb2d754d63ee5a0b8331e9",
    theme: "Jack",
  },  {
    date: "2022-07-01T10:42:08.696Z",
    description: "description",
    image: "",
    name: "name",
    owner: "62bb2d754d63ee5a0b8331e9",
    theme: "Jack",
  },  {
    date: "2022-07-01T10:42:08.696Z",
    description: "description",
    image: "",
    name: "name",
    owner: "62bb2d754d63ee5a0b8331e9",
    theme: "Jack",
  },
]
const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Коллекция',
    dataIndex: 'collection',
    key: 'collection',
    render: (collectionName) => (
      <Tag>{collectionName.toUpperCase()}</Tag>
    )
  },
  {
    title: 'Автор',
    key: 'author',
    dataIndex: 'author',

  }
]
const data = [
  {
    key: '1',
    name: 'Some_Item_Name',
    collection: 'Some_Collection',
    author: 'Some_Collection',
  },  {
    key: '2',
    name: 'Some_Item_Name',
    collection: 'Some_Collection',
    author: 'Some_Collection',
  },  {
    key: '3',
    name: 'Some_Item_Name',
    collection: 'Some_Collection',
    author: 'Some_Collection',
  },
];

export const HomePage = () => {
  return (
    <div className="container">
      <h2 className="home-title">Топ 5 самых больших коллекций</h2>
      <div className="home-collections">
        {collections.map((collection, index) => {
          return (
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
          );
        })}
      </div>

      <h2 className="home-title">Последний добавленные айтемы</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
