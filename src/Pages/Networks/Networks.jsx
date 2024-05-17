import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from "../../Common Comp/Navbar/Navbar"

export default function Networks() {
    const getNetwork = useSelector((state) => state.network.network.data);
    console.log(getNetwork);
    return (
        <div >
            <Navbar/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Chain ID</th>
                        <th>Explorer</th>
                        <th>RPC</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getNetwork?.map((d, i) => {
                            return (
                                <tr>
                                    <th>{d.name}</th>
                                    <th>{d.chainID}</th>
                                    <th>{d.explorer}</th>
                                    <th>{d.rpc}</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
