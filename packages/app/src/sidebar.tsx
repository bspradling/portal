import React, { FC, useContext } from 'react';
import { 
  AddCircleOutline, 
  AttachMoney, 
  Assessment,
  Home, 
  LibraryBooks, 
  Storage 
} from '@material-ui/icons';
import { Link, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import { Settings as SidebarSettings } from '@backstage/plugin-user-settings';

import {
  Sidebar,
  SidebarItem,
  SidebarDivider,
  sidebarConfig,
  SidebarContext,
  SidebarSpace,
} from '@backstage/core';

export const AppSidebar = () => (
  <Sidebar>
    <SidebarLogo />
    <SidebarDivider />
    {/* Global nav, not org-specific */}
    <SidebarItem icon={Home} to="./" text="Home" />
    <a href="https://www.notion.so/bspradling/Brett-Shelby-b2520108f983456798a712806dafb0c5"><SidebarItem icon={LibraryBooks} text="Notes" /></a>
    <a href="https://cloud.spradling.me"><SidebarItem icon={Storage} text="Documents" /></a>
    <SidebarItem icon={AddCircleOutline} to="create" text="Create..." />
    <SidebarDivider />
    <SidebarItem icon={Assessment} to="financial" text="Financial"/>
    <SidebarItem icon={AttachMoney} to="money" text="Accounts"/>
    {/* End global nav */}
    <SidebarDivider />
    <SidebarSpace />
    <SidebarDivider />
    <SidebarSettings />
  </Sidebar>
);

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo: FC<{}> = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useContext(SidebarContext);

  return (
    <div className={classes.root}>
      <Link
        component={NavLink}
        to="/"
        underline="none"
        className={classes.link}
      >
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};
