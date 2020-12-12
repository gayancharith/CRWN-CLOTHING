import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import image4 from "../../images/4.jpg";
import image5 from "../../images/5.jpg";

import "../directory/directory.styles.scss";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: "hats",
          imageUrl: image1,
          id: 1,
          linkUrl: "hats",
        },
        {
          title: "jackets",
          imageUrl: image2,
          id: 2,
          linkUrl: "",
        },
        {
          title: "sneakers",
          imageUrl: image3,
          id: 3,
          linkUrl: "",
        },
        {
          title: "women",
          imageUrl: image4,
          size: "large",
          id: 4,
          linkUrl: "",
        },
        {
          title: "men",
          imageUrl: image5,
          size: "large",
          id: 5,
          linkUrl: "",
        },
      ],
    };
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
