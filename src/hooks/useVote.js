import React, {useState} from 'react';
import {vote} from '../api/links_comments';
import {useAuth} from '../providers/AuthProvider';

export default useVote = (fullname, initState) => {
  const {token} = useAuth();
  const [state, setState] = useState(initState);

  const upvote = async () => {
    setState(true);
    return vote(token, fullname, 1);
  };

  const downvote = async () => {
    setState(false);
    return vote(token, fullname, -1);
  };

  const unvote = async () => {
    setState(null);
    return vote(token, fullname, 0);
  };

  return {upvote, downvote, unvote, state};
};
