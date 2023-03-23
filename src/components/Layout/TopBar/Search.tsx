import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  TextField,
  Slide,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  Autocomplete,
  Stack,
  Typography,
  Box,
  alpha,
  createFilterOptions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from 'store/hooks';
import { sidebarData } from 'components/Layout/SideBar';
import { Child, FilteredMenu } from 'models/Menu';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const StyledSearchbar = styled('div')<{ openSidebar: boolean }>(
  ({ theme }) => ({
    backdropFilter: `blur(6px)`,
    WebkitBackdropFilter: `blur(6px)`,
    //   backgroundColor: alpha(color, opacity),
    backgroundColor: 'rgba(255,255,255, 0.5)',
    top: 0,
    right: 0,
    zIndex: 99,
    width: `${(props: { openSidebar: boolean }) =>
      props.openSidebar ? 'calc(100vw - 100px)' : 'calc(100vw - 236px)'}`,
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: HEADER_MOBILE,
    padding: theme.spacing(0, 3),
    color: '#626b79',
    border: `${(props: SearchProps) =>
      props.openSidebar ? `1px solid red` : `1px solid brown`}`,
  }),
);

// ----------------------------------------------------------------------
interface Option {
  title: string;
  parent: string;
  path: string;
}

interface SearchProps {
  openSidebar: boolean;
}

export default function Searchbar({ openSidebar }: SearchProps) {
  const navigate = useNavigate();
  const menuData = useAppSelector((state) => state.userDetails.menuData);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState<FilteredMenu[]>([]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const filtered: FilteredMenu[] = [...sidebarData];
    if (menuData && menuData.length > 0) {
      sidebarData.forEach((menu, i = 0) => {
        if (menuData.find((item) => item.id === menu.id) === undefined) {
          filtered.splice(i, 1);
        } else {
          const filteredChild: Child[] = sidebarData[i].child.filter(
            (a) =>
              menuData.find((subitem) => subitem.id === a.id) !== undefined,
          );
          if (filteredChild.length > 0)
            filtered[filtered.findIndex((a) => a.id === menu.id)].child = [
              ...filteredChild,
            ];
        }
      });
    }
    setFilteredMenu(filtered);
  }, [menuData]);

  const getOption = () => {
    const option: Option[] = [];

    filteredMenu.forEach((val) => {
      val.child.forEach((res) => {
        option.push({
          ...res,
          parent: val.title,
        });
      });
    });
    return option;
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <SearchIcon sx={{ color: '#303030' }} />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar openSidebar={openSidebar}>
            <Autocomplete
              disablePortal
              popupIcon={<></>}
              id="combo-box-demo"
              options={getOption()}
              filterOptions={createFilterOptions({
                stringify: (option) => option.title + option.path,
              })}
              getOptionLabel={(option) => option.title}
              groupBy={(option) => option.parent}
              onChange={(_, value) => {
                navigate(value?.path || '');
              }}
              fullWidth
              sx={{
                width: openSidebar
                  ? `calc(100vw - 100px)`
                  : `calc(100vw - 266px)`,
              }}
              noOptionsText={
                <Stack
                  width="100%"
                  //   minHeight="200px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography sx={{ fontWeight: '700', py: 2 }}>
                    Not found
                  </Typography>
                  {searchValue && (
                    <Typography sx={{ fontSize: '16px', pb: 2 }}>
                      Not result for{' '}
                      <Typography component="span" fontWeight="700">
                        &quot;{searchValue}&quot;
                      </Typography>
                    </Typography>
                  )}
                </Stack>
              }
              renderGroup={(params) => (
                <li key={params.key}>
                  <Box p="5px 8px">
                    <Box
                      bgcolor={alpha('#008E58', 0.1)}
                      p="10px 15px"
                      borderRadius="8px"
                      position="sticky"
                    >
                      {params.group}
                    </Box>
                  </Box>
                  <Box>{params.children}</Box>
                </li>
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Box>
                    <Typography fontWeight="700" fontSize="14px">
                      {option.title}
                    </Typography>
                    <Typography fontSize="14px" color="#626b79">
                      {option.path}
                    </Typography>
                  </Box>
                </Box>
              )}
              PaperComponent={(props) => (
                <Box
                  {...props}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '10px',
                    mt: 1.8,
                    backdropFilter: `blur(6px)`,
                    WebkitBackdropFilter: `blur(6px)`,
                    backgroundColor: 'rgba(255,255,255, 0.9)',
                    boxShadow:
                      'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px',
                  }}
                />
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  fullWidth
                  placeholder="Search…"
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  sx={{
                    mr: 1,
                    fontWeight: 'fontWeightBold',
                    '& .MuiOutlinedInput-root': {
                      // border: "1px solid yellow",
                      borderRadius: '0',
                      padding: '0',
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
                        border: 'unset',
                      },
                  }}
                />
              )}
            />
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
