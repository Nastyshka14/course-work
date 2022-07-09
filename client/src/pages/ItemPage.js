import React, {useState, useCallback, useContext, useEffect} from "react";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import {Avatar, Comment, Form, Tag, Button, Tooltip, Modal} from "antd";
import "./ItemPage.css";
import TextArea from "antd/es/input/TextArea";
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

export const ItemPage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const { username } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const itemId = useParams().id;

  const [item, setItem] = useState({})
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [commentForEdit, setCommentForEdit] = useState({})

  const getItem = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/item/item/${itemId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setItem(fetched);
    } catch (e) {}
  }, [token, itemId, request]);

  const getComments = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/comment/${itemId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setComments(fetched);
    } catch (e) {}
  }, [token, itemId, request]);

  useEffect(() => {
    getItem();
    getComments();
  }, [getItem, getComments]);

  const addComment = async () => {
    const data = await request( `/api/comment`,
      "POST",
      { comment, item: item._id, author: userId, authorName: username },
      { Authorization: `Bearer ${token}` }
    )
    setComment('')
    getComments()
    return data
  }

  const deleteComment = async (id) => {
    const data = await request( `/api/comment/${id}`,
      "DELETE",
      { Authorization: `Bearer ${token}` }
    )
    getComments()
    return data
  }

  const editComment = async (comment) => {
    const data = await request( `/api/comment/${comment._id}`,
      "PUT",
      comment,
      { Authorization: `Bearer ${token}` }
    )
    getComments()
    return data
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentForEditChange = (e) => {
    setCommentForEdit({...commentForEdit, comment: e.target.value});
  };

  const like = (comment) => {
    editComment({
      ...comment,
      liked: [...comment.liked, userId],
      disliked: comment.disliked.filter(item => item !== userId)
    })
  };

  const dislike = (comment) => {
    editComment({
      ...comment,
      disliked: [...comment.disliked, userId],
      liked: comment.liked.filter(item => item !== userId)
    })
  };

  const showEditModal = (comment) => {
    setCommentForEdit(comment)
    setIsEditModalVisible(true);
  };

  const handleOk = () => {
    setIsEditModalVisible(false);
    editComment({...commentForEdit, editedAt: dayjs()})
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  const getReactActions = (comment) => [
    <Tooltip key="comment-basic-like" title="Like">
      {
        comment.liked.includes(userId) ?
          <span>
          <LikeFilled />
          <span className="comment-action">{comment.liked.length}</span>
        </span> :
          <span onClick={() => like(comment)}>
          <LikeOutlined />
          <span className="comment-action">{comment.liked.length}</span>
        </span>
      }
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      {
        comment.disliked.includes(userId) ?
          <span>
          <DislikeFilled />
          <span className="comment-action">{comment.disliked.length}</span>
        </span> :
          <span onClick={() => dislike(comment)}>
          <DislikeOutlined />
          <span className="comment-action">{comment.disliked.length}</span>
        </span>
      }
    </Tooltip>,
  ];

  const getAuthorActions = (comment) => [
    <span className="comment-action" onClick={() => showEditModal(comment)}> Редактировать </span>,
    <span className="comment-action" onClick={() => deleteComment(comment._id)}> Удалить </span>
  ]

  return (
    <div className="container">
      <div className="item-header">
        <h1>{item.name}</h1>
        <Tag>{item.collectionsName}</Tag>
      </div>

      <div>Добавить коммент</div>

      <Form.Item>
        <TextArea rows={4} onChange={handleCommentChange} value={comment} />
      </Form.Item>
      <Form.Item>
        <Button onClick={addComment} type="primary">
          Add Comment
        </Button>
      </Form.Item>

      {comments.map((comment, index) => {
        const date = dayjs(comment.date).format('DD.MM.YYYY HH:mm')
        const editedAtDate = dayjs(comment.editedAt).format('DD.MM.YYYY HH:mm')
        const reactActions = getReactActions(comment)
        const authorActions = getAuthorActions(comment)
        return (
          <>
            <Comment
              key={index}
              actions={comment.author === userId ? [...reactActions, ...authorActions] : reactActions}
              author={<a>{comment.authorName}</a>}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="ava" />}
              content={<p>{comment.comment}</p>}
              datetime={<> <span>{date}</span> {comment.editedAt ? <span> (отредактировано {editedAtDate}) </span> : null} </> }
            />
          </>
        )
      })}

      <Modal title="Basic Modal" visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item>
          <TextArea rows={4} onChange={handleCommentForEditChange} value={commentForEdit.comment} />
        </Form.Item>
      </Modal>
    </div>
  )
}
