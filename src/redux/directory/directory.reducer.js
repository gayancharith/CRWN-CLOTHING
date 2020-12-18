import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import image4 from "../../images/4.jpg";
import image5 from "../../images/5.jpg";

const INITIAL_STATE = {
  sections: [
    {
      title: "hats",
      imageUrl: image1,
      id: 1,
      linkUrl: "shop/hats",
    },
    {
      title: "jackets",
      imageUrl: image2,
      id: 2,
      linkUrl: "shop/jackets",
    },
    {
      title: "sneakers",
      imageUrl: image3,
      id: 3,
      linkUrl: "shop/sneakers",
    },
    {
      title: "women",
      imageUrl: image4,
      size: "large",
      id: 4,
      linkUrl: "shop/womens",
    },
    {
      title: "men",
      imageUrl: image5,
      size: "large",
      id: 5,
      linkUrl: "shop/mens",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
