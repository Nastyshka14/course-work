import "./CollectionsPage.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModalCreate } from "../components/ModalCreate";
import { CollectionItem } from "../components/CollectionItem";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { Link } from "react-router-dom";


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
      <ModalCreate className="modalBtn" updateCollection={updateCollection} />
      <div className="containerList">
        {collections.map((collection, index) => {
          return (
            <div className="containerItem">
              <div>{index + 1}</div>
              <img src={collection.image} alt="imagge" />
              <div>{collection.name}</div>
              <div>{collection.description}</div>
              <div>{collection.theme}</div>
              <Link to={`/detail/${collection._id}`} replace></Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
