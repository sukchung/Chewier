// CSS
import "./Styles/MainPage.css";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold titlefont">Chewier</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4 catchphrase">
          For when the bowl is empty and they start to guilt trip you
        </p>
        <img
          src="https://www.news-medical.net/images/news/ImageForNews_704692_16450308930134291.jpg"
          className="img-fluid"
          alt=""
        />
      </div>
    </div>
  );
}

export default MainPage;
