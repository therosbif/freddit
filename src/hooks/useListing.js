import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import Listing from '../utils/Listing';

export default useListing = (
  listingCb,
  subreddit,
  mode,
  limit = 25,
  initExtraArgs = {},
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [listing, setListing] = useState(null);

  const getNext = async (extraArgs = {}) => {
    setLoading(true);
    listing
      .next(extraArgs)
      .then(res => {
        setData([...data, ...res]);
        setLoading(false);
      })
      .catch(error => {
        setData([{ error }]);
        setLoading(false);
      });
  };

  const getPrev = async (extraArgs = {}) => {
    setLoading(true);
    listing
      .prev(extraArgs)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(error => {
        setData([{ error }]);
        setLoading(false);
      });
  };

  const reload = () => {
    setData([]);
    console.log('RELOAD');
    setLoading(true);
    setListing(new Listing(listingCb, subreddit, mode, token, limit));
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (listing) {
      listing
        .init(initExtraArgs)
        .then(res => {
          setData([...data, ...res]);
          setLoading(false);
        })
        .catch(error => {
          setData([{ error }]);
          setLoading(false);
        });
    }
  }, [listing]);

  return { data, getPrev, getNext, reload, loading };
};
