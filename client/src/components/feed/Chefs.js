import React from "react";

function Chefs() {
  const chefsData = [
    {
      id: 1,
      name: "Ellen Ripley",
      avatar: "https://i.pravatar.cc/40?img=1",
      status: "offline",
    },
    {
      id: 2,
      name: "Thomas Anderson",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: "online",
    },
    {
      id: 3,
      name: "Luke Skywalker",
      avatar: "https://i.pravatar.cc/40?img=7",
      status: "online",
    },
    {
      id: 4,
      name: "Sarah Connor",
      avatar: "https://i.pravatar.cc/40?img=5",
      status: "online",
    },
    {
      id: 5,
      name: "Captain James T. Kirk",
      avatar: "https://i.pravatar.cc/40?img=11",
      status: "offline",
    },
    {
        id: 6,
        name: "Captain James T. Kirk",
        avatar: "https://i.pravatar.cc/40?img=11",
        status: "offline",
      },
      {
        id: 7,
        name: "Captain James T. Kirk",
        avatar: "https://i.pravatar.cc/40?img=11",
        status: "offline",
      },
      {
        id: 8,
        name: "Captain James T. Kirk",
        avatar: "https://i.pravatar.cc/40?img=11",
        status: "offline",
      },
      {
        id: 9,
        name: "Captain James T. Kirk",
        avatar: "https://i.pravatar.cc/40?img=11",
        status: "offline",
      },
  ];

  return (
    <>
      <div className=" font-secondary text-2xl mb-10 mt-5 text-center">Chefs</div>
      <ul className="divide-y divide-slate-100">
        {chefsData.map((chef) => (
          <li key={chef.id} className="flex items-center gap-4 px-4 py-3">
            <div className="self-start">
              <a
                href="#"
                className="relative inline-flex h-8 w-8 items-center justify-center rounded-full text-white"
              >
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  title={chef.name}
                  width="32"
                  height="32"
                  className="max-w-full rounded-full"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white ${
                    chef.status === "online"
                      ? "bg-emerald-500"
                      : "bg-pink-500"
                  } p-1 text-sm text-white`}
                >
                  <span className="sr-only">
                    {chef.status === "online" ? "online" : "offline"}
                  </span>
                </span>
              </a>
            </div>

            <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
              <h4 className="w-full truncate text-base text-slate-700">
                {chef.name}
              </h4>
            </div>

            <a
              href="#"
              className="flex h-6 w-6 items-center justify-center text-xs text-slate-500 transition-colors hover:text-emerald-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
              <span className="sr-only">user options</span>
            </a>
          </li>
        ))}
      </ul>
      {/* <!-- End One Line List With Trailing Icon And Leading Avatar --> */}
    </>
  );
}

export default Chefs;
