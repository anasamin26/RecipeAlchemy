import React from "react"

 function CardPost({content}) {
  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500">
        <div className="p-4">
          <h4 className="mb-4 text-xl font-medium text-slate-700">
          {content}
          </h4>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  )
}
export default CardPost;
