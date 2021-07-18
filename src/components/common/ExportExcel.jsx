import React from 'react'
import { Button } from '@chakra-ui/react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

function ExportExcel({ data, filename }) {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCsv = (info, fileName) => {
        const ws = XLSX.utils.json_to_sheet(info)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }
    return (
        <Button
            height='3rem'
            colorScheme='teal'
            borderRadius='10px'
            onClick={() => {
                exportToCsv(data, filename)
            }}>
            Export Excel
        </Button>
    )
}

export default ExportExcel
