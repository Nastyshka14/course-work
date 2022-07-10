import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import {Card, message, Space, Spin, Table, Tag} from "antd";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import {BASIC_ERROR} from "../shared/constants";
const { Meta } = Card;

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => <Link to={`/item/${record._id}`}> <a>{record.name}</a> </Link>,
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

export const HomePage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [itemsList, setItemsList] = useState([])
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchCollections = async () => {
    setLoading(true)
    try {
      const fetched = await request('/api/collection/top', 'GET', null);
      setCollections(fetched);
      setLoading(false)
    } catch (e) {
      setLoading(false)
      message.error(BASIC_ERROR)
    }
  }

  const fetchItems = async () => {
    try {
      const fetched = await request('/api/item/all', 'GET', null);
      setItemsList(fetched);
    } catch (e) {
      message.error(BASIC_ERROR)
    }
  }

  useEffect(() => {
    fetchCollections();
    fetchItems()
  }, []);

  const data = itemsList.map((item) => ({
    ...item,
    key: item._id,
    author: item.ownerName,
  })).sort((a,b) => b.date > a.date ? 1 : -1).slice(0, 20)

  return (
    <Spin spinning={loading}>
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
                        <div>Автор: {collection.ownerName}</div>
                      </div>
                    }
                  />
                </Card>
              </Link>
            );
          })}
        </div>

        <h2 className="home-title">Последний добавленные айтемы</h2>
        <Table columns={columns} dataSource={data} />
      </div>
    </Spin>
  )
}
