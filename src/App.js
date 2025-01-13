import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];



export default function App() {

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriends() {
    setShowAddFriend((show) => !show);
  }

  return <div className='app'>
    <div className="sidebar">
      <FriendsList friends={friends} />
      {showAddFriend && <FormAddFriend />}
      <Button onClick={handleShowAddFriends}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>
    </div>

    <FormSplitBill />
  </div>
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}


function FriendsList({ friends }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  )
}

function Friend({friend}) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && (
        <p className="">
          You and {friend.name} are even.
        </p>
      )}

      <Button>Select</Button>
    </li>
  );
}




function FormAddFriend() {

  const [friendName, setFriendName] = useState('');

  const [friendAvatar, setFriendURL] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName || !friendAvatar) return;

    const id = crypto.randomUUID();
    const newFriend = {
      friendName,
      friendAvatar: `${friendAvatar}?=${id}`,
      balance: 0,
    };

    console.log(newFriend);

    setFriendName('');
    setFriendURL("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🎆 Image URL</label>
      <input
        type="text"
        value={friendAvatar}
        onChange={(e) => setFriendURL(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with X</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🧍‍♂️ Your Expense</label>
      <input type="text" />

      <label>👬 X's expenses</label>
      <input type="text" disabled />

      <label htmlFor="">😢 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}
