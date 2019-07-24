import React from 'react';
import './styling/SignIn.scss';

const SignIn = () => {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <h1>Watch List</h1>
      </div>

      <form>
        <input type="text" />
        <input type="password" />
        <input type="submit" />
      </form>

      <div>
        <div>
          <p>New To Watch List?</p>
          {/*eslint-disable-next-line*/}
          <a href="#">Sign Up Now</a>
        </div>
        {/*eslint-disable-next-line*/}
        <a href="">Guest</a>
      </div>
    </div>
  );
};

export default SignIn;
