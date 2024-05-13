import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Avatar,
    Box,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    casesListSelector,
    getCasesList,
    setCases,
} from '@src/features/cases-list/slice';
import {
    deleteReport,
    getData,
    revertAll,
    setOpenNewReport,
    setShowCasesList,
} from '@src/features/display/slice';
import DeleteIcon from '@mui/icons-material/Delete';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { textRenderer } from 'handsontable/renderers/textRenderer';
import { getIdOfMeddraVersion, getMeddraReleases, getTerms, prepareData } from '@src/features/meddra/slice';

registerAllModules();
const hotTableRef = React.createRef();

export const CasesList = () => {
    const dispatch = useDispatch();
    const { cases } = useSelector(casesListSelector);

    const openReport = (id) => {
        dispatch(getData(id));
        dispatch(setOpenNewReport(true));

        dispatch(getMeddraReleases());

        dispatch(setShowCasesList(false));
    };

    const removeReport = (id) => {
        let answer = window.confirm(
            `Are you sure you want to remove report ${id}?`,
        );
        if (!answer) return;

        let casesCopy = JSON.parse(JSON.stringify(cases));
        casesCopy = casesCopy.filter((x) => x.id !== id);
        console.log('remove');
        console.log(casesCopy);
        dispatch(setCases(casesCopy));
        dispatch(deleteReport(id));
        //   hotTableRef.current.hotInstance.updateSettings({
        // 	data: casesCopy
        //   });
        //   hotTableRef.current.hotInstance.render();
    };

    // const generateList = () => {
    //     console.log("show");
    //     console.log(cases);
    //     let items = [];
    //     Object.values(cases).forEach((item, index) => {
    //       items.push(
    //         <ListItem
    //             secondaryAction={
    //               <IconButton edge="end" aria-label="delete">
    //                 <DeleteIcon onClick={() => removeReport(item)}/>
    //               </IconButton>
    //             }
    //           >
    //             <ListItemButton onClick={() => openReport(item)}>
    //             <ListItemText primary={`Case id = ${item}`} />
    //             </ListItemButton>
    //           </ListItem>
    //       )
    //     });
    //     return items;
    // }

    const generateList = () => {
        return (
            <HotTable
                ref={hotTableRef}
                autoRowSize={true}
                autoColumnSize={true}
                licenseKey="non-commercial-and-evaluation"
                data={cases}
                rowHeights={40}
                style={{ marginLeft: '50px' }}
                rowHeaders={true}
                className="customFilterButton"
                dropdownMenu={{
                    items: {
                        filter_by_condition: {},
                        filter_operators: {},
                        filter_by_condition2: {},
                        filter_by_value: {},
                        filter_action_bar: {},
                    },
                }}
                colHeaders={[
                    'Open ',
                    'Id  ',
                    'Case Number  ',
                    'Reaction Country  ',
                    'Serious ',
                    'Creation date',
                    'Received date',
                    'Suspect Drug Name  ',
                    'Reaction MedDRA Code  ',
                    'Remove ',
                ]}
                columns={[
                    { editor: false },
                    { data: 'id', editor: false },
                    { data: 'case_number', editor: false },
                    { data: 'country', editor: false },
                    { data: 'serious', editor: false },
                    { data: 'creation_date', editor: false },
                    { data: 'received_date', editor: false },
                    { data: 'drug_names', editor: false },
                    { data: 'reaction_names', editor: false },
                    { editor: false },
                ]}
                manualColumnResize={true}
                filters={true}
                columnSorting={true}
                // hiddenColumns = {{
                // 	columns: [0, 1]
                // }}
                columnHeaderHeight={35}
                stretchH="all"
                cells={function (row, col) {
                    var cellPrp = {};
                    if (col === 0) {
                        cellPrp.renderer = openBtn;
                        cellPrp.readOnly = true;
                    }
                    if (col === 9) {
                        cellPrp.renderer = removeBtn;
                        cellPrp.readOnly = true;
                    }
                    return cellPrp;
                }}
                afterOnCellMouseDown={function (event, cords, TD) {
                    console.log(cords);
                    if (cords['col'] === 0) {
                        if (cords['row'] !== -1) {
                            const id = hotTableRef.current.hotInstance.getDataAtRow(
                                cords['row'],
                            )[1];
                            openReport(id);
                        }
                    }
                    if (cords['col'] === 9) {
                        if (cords['row'] !== -1) {
                            const id = hotTableRef.current.hotInstance.getDataAtRow(
                                cords['row'],
                            )[1];
                            removeReport(id);
                        }
                    }
                }}
            ></HotTable>
        );
    };

    function openBtn(instance, td, row, col, prop, value, cellProperties) {
        textRenderer.apply(this, arguments);
        td.innerHTML = '<button class="myBtOpen">' + 'OPEN' + '</button>';
    }

    function removeBtn(instance, td, row, col, prop, value, cellProperties) {
        textRenderer.apply(this, arguments);
        td.innerHTML =
            '<button class="myBtRemove">' +
            '<i class="fa fa-remove"></i>' +
            '</button>';
    }

    // return (<>{generateList()}</>)

    return (
        // <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300, paddingLeft: '30px' }}>
        //   <List
        //     aria-label="cases-list"
        //   >
        //     {generateList()}
        //   </List>
        // </Box>
        <Box>{generateList()}</Box>
    );
};
