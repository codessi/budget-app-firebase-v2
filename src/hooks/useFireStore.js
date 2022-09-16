import React, { useReducer, useState, useEffect } from "react";
import { firestore, timestamp } from "./../config";

export default function useFireStore(collection) {
  let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
  };
  const firestoreReducer = (state, action) => {
    switch (action.type) {
      case "IS_PENDING":
        return {
          document: null,
          error: null,
          success: null,
          isPending: true,
        };
        case "UPDATED_DOCUMENT":
          return {
            isPending: false,
            document: action.payload,
            error: null,
            success: true,
          };
      case "ADDED_DOCUMENT":
        return {
          isPending: false,
          document: action.payload,
          error: null,
          success: true,
        };
      case "DELETED_DOCUMENT":
        return {
          isPending: false,
          document: null,
          error: null,
          success: true, 
        }
      case "ERROR":
        return {
          isPending: false,
          document: null,
          error: action.payload,
          success: false,
        };
      default:
        return state;
    }
  };

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = firestore.collection(collection);
  const dispatcheIfNotCanceled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (docId, obj) => {
    dispatch({ type: "IS_PENDING" });
    try {

      const updatedDocument = await ref.doc(docId).update(obj);
      dispatcheIfNotCanceled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });

    } catch (error) {
      dispatcheIfNotCanceled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatcheIfNotCanceled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatcheIfNotCanceled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };



  const deleteDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const ref = firestore.collection(collection);
      await ref.doc(doc).delete();
      dispatcheIfNotCanceled({
        type: "DELETED_DOCUMENT",
      });
      
    } catch (error) {
      dispatcheIfNotCanceled({
        type: "ERROR",
        payload: "could not delete",
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return [addDocument, deleteDocument, updateDocument,response ];
}
