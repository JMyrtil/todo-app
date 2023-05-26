import { createStyles, Header, Navbar, Text } from '@mantine/core';
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    color: theme.colors.gray[0],
    height: '100%',
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
  },
  link: {
    width: '80px',
  },
}));

const HeaderComponent = () => {
  const { classes } = useStyles();
  return (
    <Header>
      <Navbar className={classes.navbar}>
        <Link className={classes.link} to="/">Todo</Link>
        <Link className={classes.link} to="/settings">Settings</Link>
      </Navbar>
    </Header>
  )
};

export default HeaderComponent;
