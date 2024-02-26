import React, { useEffect, useState } from "react";

const Seguir = ({ userPost, walletAddress }) => {


    return (
        <>
            <button
                className="mb-3 mt-2 feedBtn btn p-3 bgbuttons dark:bg-jacarta-900"
               
            >
                {true ? (
                    <p className="dark:text-white">following</p>
                ) : (
                    <p className="dark:text-white">follow</p>
                )}
            </button>
        </>
    );
};
export default Seguir;
