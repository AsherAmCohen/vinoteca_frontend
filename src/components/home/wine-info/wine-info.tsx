import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Paper
  } from "@mui/material";
  import {
    LabelOutlined,
    Business,
    Category,
    Description,
    AttachMoney,
    Inventory,
    Repeat,
    Info
  } from "@mui/icons-material";
  
  import { useWinesQuery } from "../../../store/api/api";
  import { useDispatch, useSelector } from "react-redux";
  import { setWineActions } from "../../../store/slice/vinoteca/slice";
  import { useEffect } from "react";
  
  export const WineInfo = (props: any) => {
    const { category, description, id, image, mark, name, price, sale, stock } = props.args.wine;
  
    const dispatch = useDispatch();
    const Filters = useSelector((state: any) => state.Vinoteca.Wine);
    const { page, rowsPerPage } = Filters;
  
    const { data } = useWinesQuery(Filters);
    const { wines, count } = data ? data.data : [];
  
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;
  
    useEffect(() => {
      dispatch(setWineActions({ value: 0, key: 'page' }));
    }, [rowsPerPage]);
  
    return (
      <>
        <DialogContent>
          <Typography variant="h6" gutterBottom>Información del Vino</Typography>
  
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 3
            }}
          >
            {/* Imagen */}
            <Box sx={{ flexShrink: 0 }}>
              <img
                src={`${apiUrl}${image}`}
                alt={name}
                style={{ maxWidth: '200px', borderRadius: '8px' }}
              />
            </Box>
  
            {/* Tabla */}
            <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LabelOutlined fontSize="small" />
                        <strong>Nombre</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Business fontSize="small" />
                        <strong>Marca</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{mark}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Category fontSize="small" />
                        <strong>Categoría</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Description fontSize="small" />
                        <strong>Descripción</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoney fontSize="small" />
                        <strong>Precio</strong>
                      </Box>
                    </TableCell>
                    <TableCell>${price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Repeat fontSize="small" />
                        <strong>Vendidos</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{sale}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Inventory fontSize="small" />
                        <strong>Stock</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{stock}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Info fontSize="small" />
                        <strong>ID</strong>
                      </Box>
                    </TableCell>
                    <TableCell>{id}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
  
        <DialogActions>
          <Button variant="contained" onClick={() => console.log("Botón de acción")}>
            Acción
          </Button>
        </DialogActions>
      </>
    );
  };
  