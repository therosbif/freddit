import React, {useEffect, useState} from 'react';
import {useAuth} from '../providers/AuthProvider';
import Listing from '../utils/Listing';

export default useListing = (
  listingCb,
  subreddit,
  limit = 25,
  initExtraArgs = {},
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {token} = useAuth();
  const [listing, setListing] = useState(null);

  const getNext = (extraArgs = {}) => {
    setLoading(true);
    listing
      .next(extraArgs)
      .then(res => {
        if (res.ok) {
          setData([...data, ...res]);
        }
        setLoading(false);
      })
      .catch(error => {
        setData([{error}]);
        setLoading(false);
      });
  };

  const getPrev = (extraArgs = {}) => {
    setLoading(true);
    listing
      .prev(extraArgs)
      .then(res => {
        if (res.ok) {
          setData(res);
        }
        setLoading(false);
      })
      .catch(error => {
        setData([{error}]);
        setLoading(false);
      });
  };

  const reload = () => {
    console.log('RELOAD');
    setListing(new Listing(listingCb, subreddit, token, limit));
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (listing) {
      listing
        .init(initExtraArgs)
        .then(res => {
          if (res.ok) {
            setData([...data, ...res]);
          }
          setLoading(false);
        })
        .catch(error => {
          setData([{error}]);
          setLoading(false);
        });
    }
  }, [listing]);

  return {data, getPrev, getNext, reload, loading};
};
