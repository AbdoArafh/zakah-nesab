import * as React from "react";

function Reload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="#fff"
        d="M12 20c-2.233 0-4.125-.775-5.675-2.325C4.775 16.125 4 14.233 4 12c0-2.233.775-4.125 2.325-5.675C7.875 4.775 9.767 4 12 4c1.15 0 2.25.237 3.3.712A7.612 7.612 0 0118 6.75V5c0-.283.096-.521.288-.713A.964.964 0 0119 4c.283 0 .521.096.713.288.192.192.288.43.287.712v5a.968.968 0 01-.288.713A.964.964 0 0119 11h-5a.968.968 0 01-.713-.288A.964.964 0 0113 10c0-.283.096-.521.288-.713A.964.964 0 0114 9h3.2a5.836 5.836 0 00-2.188-2.2A5.928 5.928 0 0012 6c-1.667 0-3.083.583-4.25 1.75C6.583 8.917 6 10.333 6 12c0 1.667.583 3.083 1.75 4.25C8.917 17.417 10.333 18 12 18c1.15 0 2.213-.304 3.188-.913a5.716 5.716 0 002.187-2.437 1.09 1.09 0 01.413-.463c.192-.125.388-.188.587-.187.383 0 .671.133.863.4.192.267.213.567.062.9a7.8 7.8 0 01-2.925 3.413C15.058 19.572 13.6 20.001 12 20z"
      />
    </svg>
  );
}

export default Reload;
