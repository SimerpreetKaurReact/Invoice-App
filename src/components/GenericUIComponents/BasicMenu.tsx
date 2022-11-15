import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material'

export interface BasicMenuProps {

    menu: { name: string, dataTest: string, id?: string, Event: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: string) => void }[]
}
export default function BasicMenu(props: BasicMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log(anchorEl)
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {props.menu.map((el, index) =>

                    <MenuItem data-test={el.dataTest} onClick={(event) => el.Event(event, el.id ? el.id : index.toString())} key={index}>{el.name}</MenuItem>)}

            </Menu>
        </>
    );
}