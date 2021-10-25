import React from "react";
const LinkCard = ({ link }) => {
  return (
    <div>
      <h2>Link</h2>
      <p>
        Your link:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {" " + link.to}
        </a>
      </p>
      <p>
        From:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {" " + link.from}
        </a>
      </p>
      <p>
        Number of clicks <strong>{link.click}</strong>
      </p>
      <p>
        Data created <strong>{new Date(link.data).toDateString()}</strong>
      </p>
    </div>
  );
};

export default LinkCard;
