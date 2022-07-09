import "./CollectionsPage.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModalCreate } from "../components/ModalCreate";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { Card, message, } from 'antd';
import { BrowserRouter, Link, NavLink } from "react-router-dom";
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
  }, [fetchCollections, collections]);

  const updateCollection = (collection) => {
    setCollections([...collections, collection])
  }

  const deleteCollection = async (id) => {
    try {
      const data = await request(`/api/collection/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      const updatedCollectionsList = collections.filter((item) => item._id !== id);
      setCollections(updatedCollectionsList);
      message.success(data.message);
    } catch (error) {
      message.error("Something went wrong, try again");
    }
  };

  function deleteCollectionHandler (event, id) {
    event.preventDefault()
    deleteCollection(id)
  }

  return (
    <div className="container">
      <ModalCreate updateCollection={updateCollection} />

      <div className="collectionsList">
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
                    <button type="primary" onClick={(event) => deleteCollectionHandler(event, collection._id)} style={{width: 20, height: 20, marginBottom: 16}} ></button>
                  </div>
                }
              />
            </Card>
            </Link>

          );
        })}
      </div>
    </div>
  );
};
