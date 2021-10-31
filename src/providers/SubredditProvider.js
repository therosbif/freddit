import React, {createContext, useContext, useState} from 'react';

const SubredditContext = createContext('');

export default function SubredditProvider({children}) {
  const [subreddit, setSubreddit] = useState('');

  return (
    <SubredditContext.Provider value={[subreddit, setSubreddit]}>
      {children}
    </SubredditContext.Provider>
  );
}

const useSubreddit = () => useContext(SubredditContext);

export {useSubreddit};
