import { useEffect, useRef, useState } from "react";
import { firestore } from "./../config";

export function useCollection(collection, _query, _orderBy) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = firestore.collection(collection);


    if (query) {
      ref = ref.where(...query);
    }
    if (query) {
      ref = ref.orderBy(...orderBy);
    }


    const unsub = ref.onSnapshot(
      (snapshot) => {
        const result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
      
        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError("could not fetch the data");
      }
    );

    return () => {
      unsub();
    };
  }, [collection, query, orderBy]);

  return [documents, error ];
}
