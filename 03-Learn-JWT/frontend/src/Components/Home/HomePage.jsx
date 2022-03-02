import { useEffect } from 'react';
import { deleteUser, getAllUsers } from '../../redux/apiRequest';
import './home.css';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';

const HomePage = () => {
  const user = useSelector(state => state.auth.login?.currentUser);
  // optional chaining
  const userList = useSelector(state => state.users.users.allUsers);
  const mgs = useSelector(state => state.users?.mgs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const handleDelete = id => {
    console.log(id);
    deleteUser(user?.accessToken, dispatch, id);
  };

  return (
    <main className='home-container'>
      <div className='home-title'>User List</div>
      <div className='home-role'>{`Your role: ${
        user?.admin ? `Admin` : `User`
      }`}</div>
      <div className='home-userlist'>
        {userList?.map(user => {
          return (
            <div className='user-container'>
              <div className='home-user'>{user.username}</div>
              <div
                className='delete-user'
                onClick={() => handleDelete(user._id)}
              >
                {' '}
                Delete{' '}
              </div>
            </div>
          );
        })}
      </div>
      <div className='errMgs'>{mgs}</div>
    </main>
  );
};

export default HomePage;
