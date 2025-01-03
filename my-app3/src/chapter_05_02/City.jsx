import React from 'react';


const styles = {
  wrapper : {
    width : 300,
    border: "1px solid gray"
  }

}

const City = (props) => {
  return (
    <div>
      <div style={{...styles.wrapper, backgroundColor:"#de3151"}}>
        <img src= ''/>
        <div>{props.image}</div>
        <div><bold>{props.title}</bold></div>
        <div>{props.distance}km</div>
      </div>
      
    </div>
  );
}

export default City;
