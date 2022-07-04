import "./CollectionsPage.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModalCreate } from "../components/ModalCreate";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { Card } from 'antd';
const { Meta } = Card;

export const CollectionsPage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request("/api/collection/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollections(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const updateCollection = (collection) => {
    setCollections([...collections, collection])
  }

  return (
    <div className="container">
      <ModalCreate updateCollection={updateCollection} />

      <div className="collectionsList">
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
    </div>
  );
};
