import React from 'react';
import InviteLinkCard from "./InviteLinkCard";

export default function GameSettings(props) {
    const room = props.room;

    return (

        <div>
            <InviteLinkCard ID={room ? room.ID : ""}/>
        </div>
    );
}