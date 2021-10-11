import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import heroImgUrl from '../assets/imgs/home-page-hero.png';
import productImgUrl from '../assets/imgs/trello-pict.png';

import { HomeHeader } from '../cmps/HomeHeader';

export function HomePage() {
  const { board } = useSelector((state) => state.boardModule);
  return (
    <div className="home">
      <HomeHeader />
      <main className="home-container">
        <div className="hero-container">
          <section className="hero">
            <div className="hero-info">
              <h1>Trellops helps teams move work forward.</h1>
              <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trellops.</p>
              <Link to="/workspace">Live Demo</Link>
            </div>
            <div className="hero-img">
              <img src={heroImgUrl} alt="" />
            </div>
          </section>
        </div>
        <section className="product">
          <div className="product-info">
            <h2>It's more than work. It's a way of working together.</h2>
            <p>Start with a Trellops board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
            {/* <Link to={`/board/${board._id}`} className="clean-link" >Start doing →</Link> */}
          </div>
          <div>
            <img src={productImgUrl} alt="" />
          </div>
        </section>
      </main>
    </div>
  )
}
