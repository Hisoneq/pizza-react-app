import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="134" r="126" /> 
    <rect x="1" y="266" rx="10" ry="10" width="278" height="27" /> 
    <rect x="1" y="313" rx="10" ry="10" width="280" height="89" /> 
    <rect x="7" y="422" rx="10" ry="10" width="104" height="41" /> 
    <rect x="131" y="421" rx="10" ry="10" width="151" height="43" />
  </ContentLoader>
)

export default Skeleton