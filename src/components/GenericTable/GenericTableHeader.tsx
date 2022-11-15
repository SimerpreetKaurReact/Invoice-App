import { Button, Typography, Box, Menu, IconButton, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

interface HeaderProps {
  header: string
  buttonFor: string



}
const GenericTableHeader = (props: HeaderProps) => {
  const { header, buttonFor } = props
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget)
  };


  useEffect(() => {

  }, [anchorElNav])
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Typography sx={{ mr: "auto" }} variant="h6">{header}</Typography>
        <Button sx={{ color: "white", display: "block", ml: 1 }}
          variant="contained"
          data-test={`view-all-${buttonFor.toLowerCase()}`}
          style={{ background: "#ef9334" }}>
          <Link
            href={`/${buttonFor.toLowerCase()}/new`}>
            {`New ${buttonFor}`}
          </Link>
        </Button>
        <Button sx={{ color: "white", display: "block", ml: 1 }}
          data-test={`add-${buttonFor.toLowerCase()}`}

          variant="contained"
          style={{ background: "#ef9334" }}>
          <Link href={`${buttonFor.toLowerCase()}`}>
            {`All ${buttonFor}`}
          </Link>
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Typography sx={{ mr: "auto" }} variant="h6">{header}</Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >

          <MenuItem id={`New ${buttonFor}`} onClick={handleCloseNavMenu}
            data-test={`view-all-${buttonFor.toLowerCase()}`}>
            <Link href={`/${buttonFor.toLowerCase()}/new`}>
              <Typography id={`New ${buttonFor}`}
                textAlign="center">{`New ${buttonFor}`}</Typography>
            </Link>
          </MenuItem>
          <MenuItem id={`All ${buttonFor}`} onClick={handleCloseNavMenu}

            data-test={`add-${buttonFor.toLowerCase()}`}
          >
            <Link href={`${buttonFor.toLowerCase()}`}>
              <Typography textAlign="center" id={`All ${buttonFor}`}>{`All ${buttonFor}`}</Typography>
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default GenericTableHeader