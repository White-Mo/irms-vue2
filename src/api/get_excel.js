const ExcelJS = require('exceljs');

export async function getExcelDemo1(data){
    console.log(data)
    //创建工作簿↓
    const workbook = new ExcelJS.Workbook();
    //设置工作簿属性↓
    workbook.creator = '中国地震局信息管理系统';
    // workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    //工作簿视图 ？？啥玩意
    workbook.views = [{
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible'
        }]
    //添加工作表
    const sheet = workbook.addWorksheet('1');
    const row = sheet.getRow(1);

	let header = []
	let items = []
	Object.keys(data[0]).map(key => {
		header.push(key)

	})
    // for
    let num = 0
    for(let i = 0;i<data.length;i++){
        let item = []
        Object.keys(data[i]).map(key => {
            sheet.getColumn(++num).width = 20
            item.push(data[i][key])
        })
        items.push(item)
    }
    data = items
    // 表头
    const header_row = sheet.getRow(1);
    header_row.values = header
    header_row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
        // console.log('Cell ' + colNumber + ' = ' + cell.value);
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = {
            name: 'Arial Black',
            color: { argb: '000' },
            family: 2,
            size: 12,
            bold: true,
        };

      });
    header_row.commit();
    // 表格内容
    for(let i = 0;i<data.length;i++){
        let row = sheet.getRow(i + 2);
        row.values = data[i]
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
            // console.log('Cell ' + colNumber + ' = ' + cell.value);
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.font = {
                name: 'Black',
                color: { argb: '000' },
                family: 2,
                size: 10,
                bold: false,
            };
          });
        row.commit();
    }
    //导出下载
    const buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer])
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.download = "总表.xlsx";
    link.click();
    document.body.removeChild(link);
}

export async function getExcelDemo2(data_list, data_num = 1){
    //创建工作簿↓
    const workbook = new ExcelJS.Workbook();
    //设置工作簿属性↓
    workbook.creator = '中国地震局信息管理系统';
    // workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    //工作簿视图 ？？啥玩意
    workbook.views = [{
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible'
        }]
        //添加工作表
    const sheet = workbook.addWorksheet('1');
    //设置列宽
    sheet.getColumn('A').width = 2.3
    sheet.getColumn('B').width = 2.3
    let col_i = 'CDEFGHIJ'
    for (let i = 0; i < col_i.length; i++) {
        sheet.getColumn(col_i[i]).width = 16
    }
    //样式
    const content_row = { vertical: 'middle', horizontal: 'center' };
    const table_header = {
        name: 'Arial Black',
        color: { argb: 'ffffff' },
        family: 2,
        size: 12,
        bold: true,
    };
    const table_header2 = {
        name: 'Arial Black',
        color: { argb: '000' },
        family: 2,
        size: 11,
        bold: true,
    };
    const table_header3 = {
        name: '黑体',
        color: { argb: '000' },
        family: 2,
        size: 11,
        bold: false,
    };
    const table_fill1 = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '1f4e78' },
    };
    const table_fill2 = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'd6dce4' },
    };
    const table_fill3 = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
    };
    const table_fill4 = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ddebf7' },
    };
    const table_fill5 = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f2f2f2' },
    };
    const black = { style: 'thick', color: { argb: '000' } }
    const red = { style: 'thick', color: { argb: 'ff0000' } }
    const white = { style: 'thin', color: { argb: 'ffffff' } }

    //表头 信息资产基础信息表
    sheet.mergeCells('C1:J2');
    let C1 = sheet.getCell('C1')
    C1.alignment = content_row
    C1.font = {
        name: 'Arial Black',
        color: { argb: '000000' },
        family: 2,
        size: 18,
    };
    C1.value = "信息资产基础信息表"
    let item_row = sheet.getRow(1);
    item_row.height = 24;

    //第三行
    sheet.getRow(3).height = 37.5
    sheet.mergeCells('C3:D3');
    let C3 = sheet.getCell("C3")
    C3.value = "设备名称"
    C3.alignment = content_row;
    C3.font = table_header
    C3.fill = table_fill1


    sheet.mergeCells('E3:J3');
    let E3 = sheet.getCell("E3")
    E3.alignment = content_row
    E3.font = content_row
    E3.fill = table_fill1

    // 第四行
    sheet.getRow(4).height = 34.5
    let C4 = sheet.getCell('C4')
    C4.value = "主 机 名"
    C4.alignment = content_row
    C4.font = table_header2
    C4.fill = table_fill2

    sheet.mergeCells('D4:E4');
    let D4 = sheet.getCell("D4")
    D4.alignment = content_row
    D4.font = table_header3
    D4.fill = table_fill2


    let F4 = sheet.getCell('F4')
    F4.value = "部  门"
    F4.alignment = content_row
    F4.font = table_header2
    F4.fill = table_fill2

    sheet.mergeCells('G4:H4');
    let G4 = sheet.getCell("G4")
    G4.alignment = content_row
    G4.font = table_header3
    G4.fill = table_fill2

    let I4 = sheet.getCell('I4')
    I4.value = "编  号"
    I4.alignment = content_row
    I4.font = table_header2
    I4.fill = table_fill2

    let J4 = sheet.getCell("J4")
    J4.alignment = content_row
    J4.font = table_header3
    J4.fill = table_fill2

    // 第五行
    sheet.getRow(5).height = 30
    let C5 = sheet.getCell('C5')
    C5.value = "设备管理员"
    C5.alignment = content_row
    C5.font = table_header2
    C5.fill = table_fill2

    let D5 = sheet.getCell("D5")
    D5.alignment = content_row
    D5.font = table_header3
    D5.fill = table_fill2

    let E5 = sheet.getCell('E5')
    E5.value = "电  话"
    E5.alignment = content_row
    E5.font = table_header2
    E5.fill = table_fill2

    let F5 = sheet.getCell("F5")
    F5.alignment = content_row
    F5.font = table_header3
    F5.fill = table_fill2

    let G5 = sheet.getCell('G5')
    G5.value = "应用管理员"
    G5.alignment = content_row
    G5.font = table_header2
    G5.fill = table_fill2

    let H5 = sheet.getCell("H5")
    H5.alignment = content_row
    H5.font = table_header3
    H5.fill = table_fill2

    let I5 = sheet.getCell('I5')
    I5.value = "电  话"
    I5.alignment = content_row
    I5.font = table_header2
    I5.fill = table_fill2

    let J5 = sheet.getCell("J5")
    J5.alignment = content_row
    J5.font = table_header3
    J5.fill = table_fill2

    // 第六行
    sheet.getRow(6).height = 42.75
        // 垂直左右居中加上自动换行
    let content_row_item = { vertical: 'middle', horizontal: 'center', wrapText: true};

    let C6 = sheet.getCell('C6')
    C6.value = "业  务  机\r\n实  验  机"
    C6.alignment = content_row_item
    C6.font = table_header2
    C6.fill = table_fill2

    let D6 = sheet.getCell("D6")
    D6.alignment = content_row_item
    D6.font = table_header3
    D6.fill = table_fill2

    let E6 = sheet.getCell('E6')
    E6.value = "主  机\n备  机"
    E6.alignment = content_row_item
    E6.font = table_header2
    E6.fill = table_fill2

    let F6 = sheet.getCell("F6")
    F6.alignment = content_row_item
    F6.value = '√\n□'
    F6.font = table_header3
    F6.fill = table_fill2

    let G6 = sheet.getCell('G6')
    G6.value = "实  体  机\n虚  拟  机"
    G6.alignment = content_row_item
    G6.font = table_header2
    G6.fill = table_fill2

    let H6 = sheet.getCell("H6")
    H6.alignment = content_row_item
    H6.font = table_header3
    H6.fill = table_fill2

    let I6 = sheet.getCell('I6')
    I6.alignment = content_row_item
    I6.font = table_header2
    I6.fill = table_fill2
    I6.value = "是    否\n可迁移"


    let J6 = sheet.getCell("J6")
    J6.alignment = content_row_item
    J6.font = table_header3
    J6.fill = table_fill2

    // 第七行
    sheet.getRow(7).height = 22.5
    sheet.mergeCells('C7:J7');
    let C7 = sheet.getCell("C7")
    C7.value = "基   本   信   息"
    C7.alignment = content_row;
    C7.font = table_header
    C7.fill = table_fill1
    // 第八行
    sheet.getRow(8).height = 22.5

    sheet.mergeCells('C8:D8');
    let C8 = sheet.getCell('C8')
    C8.value = "品  牌"
    C8.alignment = content_row
    C8.font = table_header2
    C8.fill = table_fill2

    sheet.mergeCells('E8:F8');
    let E8 = sheet.getCell('E8')
    E8.value = "型  号"
    E8.alignment = content_row
    E8.font = table_header2
    E8.fill = table_fill2

    sheet.mergeCells('G8:H8');
    let G8 = sheet.getCell('G8')
    G8.value = "安装位置"
    G8.alignment = content_row
    G8.font = table_header2
    G8.fill = table_fill2

    sheet.mergeCells('I8:J8');
    let I8 = sheet.getCell('I8')
    I8.value = "机柜号"
    I8.alignment = content_row
    I8.font = table_header2
    I8.fill = table_fill2
    // 第九行
    sheet.getRow(9).height = 19.5

    sheet.mergeCells('C9:D9');
    let C9 = sheet.getCell('C9')
    C9.alignment = content_row
    C9.font = table_header2
    C9.fill = table_fill3

    sheet.mergeCells('E9:F9');
    let E9 = sheet.getCell('E9')
    E9.alignment = content_row
    E9.font = table_header2
    E9.fill = table_fill3

    sheet.mergeCells('G9:H9');
    let G9 = sheet.getCell('G9')
    G9.alignment = content_row
    G9.font = table_header2
    G9.fill = table_fill3

    sheet.mergeCells('I9:J9');
    let I9 = sheet.getCell('I9')
    I9.alignment = content_row
    I9.font = table_header2
    I9.fill = table_fill3
    // 第十行
    sheet.getRow(10).height = 22.5

    sheet.mergeCells('C10:D10');
    let C10 = sheet.getCell('C10')
    C10.value = "序列号"
    C10.alignment = content_row
    C10.font = table_header2
    C10.fill = table_fill2

    sheet.mergeCells('E10:F10');
    let E10 = sheet.getCell('E10')
    E10.value = "保修期"
    E10.alignment = content_row
    E10.font = table_header2
    E10.fill = table_fill2

    sheet.mergeCells('G10:H10');
    let G10 = sheet.getCell('G10')
    G10.value = "上线时间"
    G10.alignment = content_row
    G10.font = table_header2
    G10.fill = table_fill2

    sheet.mergeCells('I10:J10');
    let I10 = sheet.getCell('I10')
    I10.value = "下线时间"
    I10.alignment = content_row
    I10.font = table_header2
    I10.fill = table_fill2
    // 第十一行
    sheet.getRow(11).height = 19.5

    sheet.mergeCells('C11:D11');
    let C11 = sheet.getCell('C11')
    C11.alignment = content_row
    C11.font = table_header2
    C11.fill = table_fill3

    sheet.mergeCells('E11:F11');
    let E11 = sheet.getCell('E11')
    E11.alignment = content_row
    E11.font = table_header2
    E11.fill = table_fill3

    sheet.mergeCells('G11:H11');
    let G11 = sheet.getCell('G11')
    G11.alignment = content_row
    G11.font = table_header2
    G11.fill = table_fill3

    sheet.mergeCells('I11:J11');
    let I11 = sheet.getCell('I11')
    I11.alignment = content_row
    I11.font = table_header2
    I11.fill = table_fill3

    // 绘制边框
        //里面的
    let inside = [D4,F4,G4,I4,
                  D5,E5,F5,G5,H5,I5,
                  D6,E6,F6,G6,H6,I6,
                  E8,G8,
                  E9,G9,
                  E10,G10
                ]
    for(let i of inside){
        i.border = {
            top: white,
            left: white,
            bottom: white,
            right: white,
        }
    }
        // 中间的
    C7.border = {
        top: white,
        left: red,
        bottom: white,
        right: red,
    }
        // 四边的
    let l = [
        C4,C5,C6,C8,C9,C10
    ]
    for(let i of l){
        i.border = {
            top: white,
            left: red,
            bottom: white,
            right: white,
        }
    }
    let r = [
        J4,J5,J6,I8,I9,I10
    ]
    for(let i of r){
        i.border = {
            top: white,
            left: white,
            bottom: white,
            right: red,
        }
    }
    let b = [E11,G11]
    for(let i of b){
        i.border = {
            top: white,
            left: white,
            bottom: red,
            right: white,
        }
    }
        // 四角
    C3.border = {
        top: red,
        left: red,
        bottom: white,
        right: white,
    }
    E3.border = {
        top: red,
        left: white,
        bottom: white,
        right: red,
    }
    C11.border = {
        top: white,
        left: red,
        bottom: red,
        right: white,
    }
    I11.border = {
        top: white,
        left: white,
        bottom: red,
        right: red,
    }

    // 第十二行
    sheet.getRow(12).height = 5.25
    sheet.mergeCells('C12:J12');
    let C12 = sheet.getCell("C12")
    C12.fill = table_fill3

    // 第十三行
    sheet.getRow(13).height = 22.5
    sheet.mergeCells('C13:F13');
    let C13 = sheet.getCell("C13")
    C13.value = "配置信息"
    C13.alignment = content_row;
    C13.font = table_header
    C13.fill = table_fill1

    sheet.mergeCells('G13:J13');
    let G13 = sheet.getCell("G13")
    G13.value = "通用软件信息"
    G13.alignment = content_row;
    G13.font = table_header
    G13.fill = table_fill1

    // 第十四行
    sheet.getRow(14).height = 15.75 // 15.25
    let C14 = sheet.getCell("C14")
    C14.value = "项  目"
    C14.alignment = content_row;
    C14.font = table_header2
    C14.fill = table_fill4

    let D14 = sheet.getCell("D14")
    D14.value = "频率"
    D14.alignment = content_row;
    D14.font = table_header2
    D14.fill = table_fill4

    let E14 = sheet.getCell("E14")
    E14.value = "通用软件信息"
    E14.alignment = content_row;
    E14.font = table_header2
    E14.fill = table_fill4

    let F14 = sheet.getCell("F14")
    F14.value = "核数/容量"
    F14.alignment = content_row;
    F14.font = table_header2
    F14.fill = table_fill4

    let G14 = sheet.getCell("G14")
    G14.value = "项  目"
    G14.alignment = content_row;
    G14.font = table_header2
    G14.fill = table_fill4

    let H14 = sheet.getCell("H14")
    H14.value = "名称"
    H14.alignment = content_row;
    H14.font = table_header2
    H14.fill = table_fill4

    let I14 = sheet.getCell("I14")
    I14.value = "版本"
    I14.alignment = content_row;
    I14.font = table_header2
    I14.fill = table_fill4

    let J14 = sheet.getCell("J14")
    J14.value = "类型"
    J14.alignment = content_row;
    J14.font = table_header2
    J14.fill = table_fill4

    // 第15到第15+n-1行
    let n = 5 // n是配置信息或者通用软件信息中的信息最大条数
    let cols = 'CDEFGHIJ'
    let row_list = [] // 存放第15到第15+n行的单元格
    for(let i = 1;i <= n;i++){
        sheet.getRow(14+i).height = 15.25
        let item_row = []
        for(let col of cols){
            let cell = sheet.getCell(col+(14+i))
            cell.font = table_header3
            if(i%2==0){
                cell.fill = table_fill5
            }else{
                cell.fill = table_fill3
            }
            item_row.push(cell)
        }
        row_list.push(item_row)
    }

    // 第16+n-1行
    let num = 16+n-1
    sheet.getRow(num).height = 18.75
    let C16 = []
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    sheet.mergeCells('G' + num + ':' + 'J' + num );
    for(let i of "CG"){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header
        item_cell.fill = table_fill1
        C16.push(item_cell)
    }
    C16[0].value = '网络信息'
    C16[1].value = '协议端口信息'

    // 第17+n-1行
    num = 17+n-1
    let C17 = []
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('E' + num + ':' + 'F' + num );
    sheet.mergeCells('H' + num + ':' + 'I' + num );
    for(let i of "CDEGHJ"){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill4
        C17.push(item_cell)
    }
    let tables = ['网卡','ip地址','MAC地址','协  议','应用名称','端口']
    for (let i in tables){
        C17[i].value = tables[i]
    }
    // 第18+n-1到19+n-1行
    num = 18+n-1
    let C18 = []
    sheet.mergeCells('E' + num + ':' + 'F' + num );
    sheet.mergeCells('H' + num + ':' + 'I' + num );
    for(let item = 0;item < 2;item++){
        sheet.getRow(num).height = 14.25
        let item_list = []
        for(let i of "CDEGHJ"){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            if(item%2==0){
                item_cell.fill = table_fill5
            }else{
                item_cell.fill = table_fill3
            }
            item_list.push(item_cell)
        }
        C18.push(item_list)
        num++
    }
    C18[0][0].value = 1
    C18[1][0].value = 2

    // 第20+n-1行
    num = 20+n-1
    sheet.getRow(num).height = 14.25
    let C20 = []
    sheet.mergeCells('D' + num + ':' + 'E' + num );
    sheet.mergeCells('H' + num + ':' + 'I' + num );
    for(let i of "CDF"){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill4
        C20.push(item_cell)
    }
    for(let i of "GHJ"){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C20.push(item_cell)
    }
    tables = ['网卡','交换机','端口']
    for (let i in tables){
        C20[i].value = tables[i]
    }

    // 第21～23 +n-1行
    num = 21+n-1
    let C21 = []
    for(let item = 0;item < 3;item++){
        sheet.getRow(num).height = 14.25
        sheet.mergeCells('D' + num + ':' + 'E' + num );
        sheet.mergeCells('H' + num + ':' + 'I' + num );
        let item_list = []
        for(let i of "CDFGHJ"){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            if(item%2==0){
                item_cell.fill = table_fill3
            }else{
                item_cell.fill = table_fill5
            }
            item_list.push(item_cell)
        }
        C21.push(item_list)
        num++
    }
    C21[0][0].value = 1
    C21[1][0].value = 2
    C21[2][0].value = 'HBA卡'

    // 绘制边框
        //里面的
    inside = [
        D14,E14,F14,G14,H14,I14,
        C17[1],C17[2],C17[3],C17[4],
        C18[0][1],C18[0][2],C18[0][3],C18[0][4],
        C18[1][1],C18[1][2],C18[1][3],C18[1][4],
        C20[1],C20[2],C20[3],C20[4],
        C21[0][1],C21[0][2],C21[0][3],C21[0][4],
        C21[1][1],C21[1][2],C21[1][3],C21[1][4],
        C21[2][1],C21[2][2],C21[2][3],C21[2][4]
    ]
    for(let i in row_list){
        for(let item = 2;item < 7;item++){
            inside.push(row_list[i][item])
        }
    }
    for(let i of inside){
        i.border = {
            top: white,
            left: white,
            bottom: white,
            right: white,
        }
    }
        // 中间的
    C16[0].border = {
        top: white,
        left: black,
        bottom: white,
        right: white,
    }
    C16[1].border = {
        top: white,
        left: white,
        bottom: white,
        right: black,
    }
        // 四边的
    l = [
        C14,
        C17[0],C18[0][0],C18[1][0],C20[0],C21[0][0],C21[1][0]
    ]
    for(let i in row_list){
        l.push(row_list[i][0])
    }
    for(let i of l){
        i.border = {
            top: white,
            left: black,
            bottom: white,
            right: white,
        }
    }
    r = [
        J14,
        C17[5],C18[0][5],C18[1][5],C20[5],C21[0][5],C21[1][5]
    ]
    for(let i in row_list){
        r.push(row_list[i][7])
    }
    for(let i of r){
        i.border = {
            top: white,
            left: white,
            bottom: white,
            right: black,
        }
    }
    b = [C21[2][1],C21[2][2],C21[2][3],C21[2][4]]
    for(let i of b){
        i.border = {
            top: white,
            left: white,
            bottom: black,
            right: white,
        }
    }
        // 四角
    C13.border = {
        top: black,
        left: black,
        bottom: white,
        right: white,
    }
    G13.border = {
        top: black,
        left: white,
        bottom: white,
        right: black,
    }
    C21[2][0].border = {
        top: white,
        left: black,
        bottom: black,
        right: white,
    }
    C21[2][5].border = {
        top: white,
        left: white,
        bottom: black,
        right: black,
    }

    // 第24 +n-1行
    num = 24+n-1
    sheet.getRow(num).height = 5.25
    sheet.mergeCells('C' + num + ':' + 'J' + num );
    sheet.getCell('C' + num).fill = table_fill3

    // 第25 +n-1行
    num = 25+n-1
    sheet.getRow(num).height = 24.75
    sheet.mergeCells('C' + num + ':' + 'J' + num );
    let C25 = sheet.getCell('C' + num)
    C25.value = '业  务  应  用  信  息'
    C25.alignment = content_row
    C25.font = {
        name: 'Arial Black',
        color: { argb: 'ffffff' },
        family: 2,
        size: 14,
        bold: true,
    };
    C25.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5b9bd5' },
    };

    // 第26 +n-1行
    num = 26+n-1
    sheet.getRow(num).height = 21.75
    sheet.mergeCells('C' + num + ':' + 'J' + num );
    let C26 = sheet.getCell('C' + num)
    C26.value = '专用软件信息'
    C26.alignment = content_row
    C26.font = table_header2
    C26.fill = table_fill4

    // 第27 +n-1到27 +n-1 + x-1行
    num = 27+n-1
    let x = 1 + 2 // x是专用软件信息中信息最大条数 第一行是表头
    let C27 = []
    for(let item = 0;item < x;item++){
        let item_list = []
        sheet.getRow(num).height = 15
        sheet.mergeCells('C' + num + ':' + 'D' + num );
        sheet.mergeCells('I' + num + ':' + 'J' + num );
        for(let i of 'CEFGHI'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            if(item == 0){
                item_cell.font = table_header2
            }else{
                item_cell.font = table_header3
            }
            if(item%2==0){
                item_cell.fill = table_fill5
            }else{
                item_cell.fill = table_fill3
            }
            item_list.push(item_cell)
        }
        C27.push(item_list)
        num++
    }
    tables = ['名称','版本','端口','上线时间','研发单位','联系人']
    for (let i in tables){
        C27[0][i].value = tables[i]
    }

    // 第28 +n-1 + x-1行
    num = 28 +n-1 + x-1
    sheet.getRow(num).height = 21.75
    sheet.mergeCells('C' + num + ':' + 'J' + num );
    let C28 = sheet.getCell('C' + num)
    C28.value = '系统用户信息'
    C28.alignment = content_row
    C28.font = table_header2
    C28.fill = table_fill4

    // 第29 ～ 30 +n-1 + x-1行
    num = 29 +n-1 + x-1
    let C29 = []
    sheet.getRow(num).height = 15
    sheet.mergeCells('C' + num + ':' + 'C' + (num+1));
    sheet.mergeCells('D' + num + ':' + 'D' + (num+1));
    sheet.mergeCells('E' + num + ':' + 'F' + (num+1));
    sheet.mergeCells('G' + num + ':' + 'H' + num );
    sheet.mergeCells('I' + num + ':' + 'I' + (num+1));
    sheet.mergeCells('J' + num + ':' + 'J' + (num+1));
    tables = ['C','D','E','G','I','J']
    let tables_i = ['用户名','使用人','级别权限','访问方式','创建时间','其他']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C29.push(item_cell)
    }
    num++
    sheet.getRow(num).height = 15
    tables = ['G','H']
    tables_i = ['本地','远程(登录方式)']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C29.push(item_cell)
    }

    // 第31 +n-1 + x-1到31 +n-1 + x-1 + z-1行
    num = 31 +n-1 + x-1
    let z = 4 // z是系统用户信息中信息的最大条数
    let C31 = []
    for(let item = 0;item < z;item++){
        sheet.getRow(num).height = 15
        sheet.mergeCells('E' + num + ':' + 'F' + num );
        let item_list = []
        for(let i of 'CDEGHIJ'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            item_cell.fill = table_fill5
            item_list.push(item_cell)
        }
        C31.push(item_list)
        num++
    }

    // 第32 +n-1 + x-1 + z-1行
    num = 32 +n-1 + x-1 + z-1
    let C32 = []
    sheet.getRow(num).height = 18
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    sheet.mergeCells('G' + num + ':' + 'J' + num );
    tables = ['C','G']
    tables_i = ['业务应用','访问权限']
    for(let i in tables){
        let item_cell =sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill4
        C32.push(item_cell)
    }

    // 第33 +n-1 + x-1 + z-1行
    num = 33 +n-1 + x-1 + z-1
    let C33 = []
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('C' + num + ':' + 'D' + num );
    tables = ['C','E','F']
    tables_i = ['域名/地址','ICP号','用户范围']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        C33.push(item_cell)
    }
    tables = ['G','H','I','J']
    tables_i = ['内网','行业网','互联网','其它']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C33.push(item_cell)
    }

    // 第34 +n-1 + x-1 + z-1行
    num = 34 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 18
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    let C34 = []
    C34.push(sheet.getCell('C' + num))
    C34[0].alignment = content_row
    C34[0].font = table_header2
    C34[0].fill = table_fill4
    C34[0].value = 'HTTP应用'
    tables = ['G','H','I','J']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C34.push(item_cell)
    }

    // 第35 +n-1 + x-1 + z-1行
    num = 35 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('C' + num + ':' + 'D' + num );
    sheet.mergeCells('G' + num + ':' + 'J' + num );
    let C35 = []
    C35.push(sheet.getCell('G' + num))
    C35[0].alignment = content_row
    C35[0].font = table_header2
    C35[0].fill = table_fill4
    C35[0].value = '链接（服务）用户信息'
    tables = ['C','E','F']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C35.push(item_cell)
    }
    // 第36 +n-1 + x-1 + z-1行
    num = 36 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    let C36 = []
    C36.push(sheet.getCell('C' + num))
    C36[0].alignment = content_row
    C36[0].font = table_header2
    C36[0].fill = table_fill4
    C36[0].value = 'FTP应用'
    tables = ['G','H','I','J']
    tables_i = ['单位','用户名','IP地址','其它']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        item_cell.fill = table_fill5
        C36.push(item_cell)
    }

    // 第37 +n-1 + x-1 + z-1行
    num = 37 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('C' + num + ':' + 'D' + num );
    let C37 = []
    for (let i of 'CEFGHIJ'){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C37.push(item_cell)
    }
    // 第38 +n-1 + x-1 + z-1行
    num = 38 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    let C38 = []
    C38.push(sheet.getCell('C' + num))
    C38[0].alignment = content_row
    C38[0].font = table_header2
    C38[0].fill = table_fill4
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C38.push(item_cell)
    }
    // 第39~41 +n-1 + x-1 + z-1行
    num = 39 +n-1 + x-1 + z-1
    let C39 = []
    for (let item = 0;item < 3;item++){
        sheet.getRow(num).height = 14.25
        sheet.mergeCells('C' + num + ':' + 'D' + num );
        let item_list = []
        for(let i of 'CEFGHIJ'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            item_cell.fill = table_fill5
            item_list.push(item_cell)
        }
        C39.push(item_list)
        num++
    }
    // 第42 +n-1 + x-1 + z-1行
    num = 42 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 18
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    let C42 = []
    C42.push(sheet.getCell('C'+num))
    C42[0].value = '存  储'
    C42[0].alignment = content_row
    C42[0].font = table_header2
    C42[0].fill = table_fill4
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C42.push(item_cell)
    }
    // 第43 +n-1 + x-1 + z-1行
    num = 43 +n-1 + x-1 + z-1
    sheet.getRow(num).height = 14.25
    sheet.mergeCells('C' + num + ':' + 'D' + num );
    let C43 = []
    tables = ['C','E','F']
    tables_i = ['卷信息','SAN/NAS','已用/分配容量(G)']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        C43.push(item_cell)
    }
    for (let i of 'GHIJ'){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C43.push(item_cell)
    }

    // 第44 +n-1 + x + z-1到44 +n-1 + x-1 + z-1 + c-1行
    num = 44 +n-1 + x-1 + z-1
    let c = 5 // c是’存储’信息中的最大条数
    let C44 = []
    for (let item = 0;item < c;item++){
        sheet.getRow(num).height = 14.25
        sheet.mergeCells('C' + num + ':' + 'D' + num );
        let item_list = []
        for (let i of 'CEF'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header2
            item_list.push(item_cell)
        }
        for (let i of 'GHIJ'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            item_cell.fill = table_fill5
            item_list.push(item_cell)
        }
        C44.push(item_list)
        num++
    }
    // 第45 +n-1 + x-1 + z-1 + c-1行
    num = 45 +n-1 + x-1 + z-1 + c-1
    sheet.getRow(num).height = 18
    sheet.mergeCells('C' + num + ':' + 'F' + num );
    let C45 = []
    C45.push(sheet.getCell('C'+num))
    C45[0].value = '本  机  存  储'
    C45[0].alignment = content_row
    C45[0].font = table_header2
    C45[0].fill = table_fill4
    tables = ['G','H','I','J']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C45.push(item_cell)
    }
    // 第46 +n-1 + x-1 + z-1 + c-1行
    num = 46 +n-1 + x-1 + z-1 + c-1
    sheet.getRow(num).height = 14.25
    let C46 = []
    tables = ['C','D','E','F']
    tables_i = ['总容量','已用空间','未用空间','年增长空间']
    for (let i in tables){
        let item_cell = sheet.getCell(tables[i]+num)
        item_cell.value = tables_i[i]
        item_cell.alignment = content_row
        item_cell.font = table_header2
        C46.push(item_cell)
    }
    for (let i of 'GHIJ'){
        let item_cell = sheet.getCell(i+num)
        item_cell.alignment = content_row
        item_cell.font = table_header3
        item_cell.fill = table_fill5
        C46.push(item_cell)
    }
    // 第47 +n-1 + x-1 + z-1 + c-1到47 +n-1 + x-1 + z-1 + c-1 + c2-1行
    num = 47 +n-1 + x-1 + z-1 + c-1
    let c2 = 5 // c2是’本机存储’信息中的最大条数
    let C47 = []
    for (let item = 0;item < c2;item++){
        sheet.getRow(num).height = 14.25
        let item_list = []
        for (let i of 'CDEF'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header2
            item_list.push(item_cell)
        }
        for (let i of 'GHIJ'){
            let item_cell = sheet.getCell(i+num)
            item_cell.alignment = content_row
            item_cell.font = table_header3
            item_cell.fill = table_fill5
            item_list.push(item_cell)
        }
        C47.push(item_list)
        num++
    }
    //第48 +n-1 + x-1 + z-1 + c-1 + c2-1到48 +n-1 + x + z-1 + c-1 + c2-1 + c3行 如果有的话
    let C48 = []
    let y = 5 // y是’链接（服务）用户信息’中的最大条数
    let c3 = 0 //表格超出数
    if( 7 + c + 2 + c2 < y){
        c3 = y - (7 + c + 2 + c2)
        for (let item = 0;item < c3;item++){
            sheet.getRow(num).height = 14.25
            let item_list = []
            for (let i of 'CDEF'){
                let item_cell = sheet.getCell(i+num)
                item_cell.alignment = content_row
                item_cell.font = table_header2
                item_list.push(item_cell)
            }
            for (let i of 'GHIJ'){
                let item_cell = sheet.getCell(i+num)
                item_cell.alignment = content_row
                item_cell.font = table_header3
                item_cell.fill = table_fill5
                item_list.push(item_cell)
            }
            C48.push(item_list)
            num++
        }
    }

    // 绘制边框
        //里面的
    inside = [
        C29[1],C29[2],C29[3],C29[4],C29[6],C29[7],
        C33[3],C33[4],C33[5],
        C34[1],C34[2],C34[3],
        C35[2],C35[3],
        C36[1],C36[2],C36[3],
        C43[3],C43[4],C43[5],
        C45[1],C45[2],C45[3],
        C46[4],C46[5],C46[6],
    ]
    for(let i in C27){
        for(let item = 1;item < 4;item++){
            inside.push(C27[i][item])
        }
    }
    for(let i in C31){
        for(let item = 1;item < 6;item++){
            inside.push(C31[i][item])
        }
    }
    for(let item = 1;item < 6;item++){
        inside.push(C37[item])
    }
    for(let item = 1;item < 4;item++){
        inside.push(C38[item])
    }
    for(let j in C39){
        for(let item = 1;item < 6;item++){
            inside.push(C39[j][item])
        }
    }
    for(let item = 1;item < 4;item++){
        inside.push(C42[item])
    }
    for(let j in C44){
        for(let item = 3;item < 6;item++){
            inside.push(C44[j][item])
        }
    }
    // 边框样式可以覆盖，这写的不严谨，直接白菜萝卜一把抓全弄一个样式
    for(let j in C47){
        if( j == C47.length - 1)break
        for(let item = 4;item < 7;item++){
            inside.push(C47[j][item])
        }
    }
        // 中间的
    for(let i of [C26,C28]){
        i.border = {
            top: white,
            left: black,
            bottom: white,
            right: black,
        }
    }
        // 四边的
    l = [C29[0],C32[0],C33[0],C34[0],C35[1],C36[0],C37[0],C38[0],C42[0],C45[0]]
    for (let item of [C27,C31,C39]){
        for (let i of item){
            l.push(i[0])
        }
    }
    for(let i of l){
        i.border = {
            top: white,
            left: black,
            bottom: white,
            right: white,
        }
    }
    for(let i of C44){
        i[0].border= {
            left: black,
        }
    }
    for(let i of C47){
        i[0].border= {
            left: black,
        }
        i[7].border= {
            top: white,
            left: white,
            bottom: white,
            right: black,
        }
    }
    for (let i of [C43[0],C46[0]]){
        i.border= {
            left: black,
        }
    }
    C25.border = {
        top: black,
        left: black,
        bottom: white,
        right: black,
    }
    r = [
        C29[5],
        C32[1],
        C33[C33.length-1],
        C34[C34.length-1],
        C35[0],
        C36[C36.length-1],
        C37[C37.length-1],
        C38[C38.length-1],
        C42[C42.length-1],
        C43[C43.length-1],
        C45[C45.length-1],
        C46[C46.length-1]
    ]
    for (let item of [C27,C31,C39,C44]){
        for (let i of item){
            r.push(i[i.length-1])
        }
    }
    for(let i of r){
        i.border = {
            top: white,
            left: white,
            bottom: white,
            right: black,
        }
    }
    if(C48.length > 0){
        for(let i = 0;i < C48.length-1;i++){
            for(let item = 4;item < 7;item++){
                inside.push(C48[i][item])
            }
        }
        for(let item in C48[C48.length-1]){
            if(item > 0 || item < 4){
                C48[C48.length-1][item].border =  {
                    bottom: black,
                }
            }else if(item >= 4 || item < 7){
                C48[C48.length-1][item].border =  {
                    top: white,
                    left: white,
                    bottom: black,
                    right: white,
                }
            }
        }
        for(let i of C48){
            i[0].border= {
                left: black,
            }
            i[7].border= {
                top: white,
                left: white,
                bottom: white,
                right: black,
            }
        }
        C48[C48.length-1][0].border = {
            left: black,
            bottom: black,
        }
        C48[C48.length-1][C48[C48.length-1].length-1].border = {
            top: white,
            left: white,
            bottom: black,
            right: black,
        }
    }else{
        for(let item in C47[C47.length-1]){
            console.log(item)
            if(item > 0 || item < 4){
                C47[C47.length-1][item].border =  {
                    bottom: black,
                }
            }else if(item >= 4 || item < 7){
                C47[C47.length-1][item].border =  {
                    top: white,
                    left: white,
                    bottom: black,
                    right: white,
                }
            }
        }
        C47[C47.length-1][0].border = {
            left: black,
            bottom: black,
        }
        C47[C47.length-1][C47[C47.length-1].length-1].border = {
            top: white,
            left: white,
            bottom: black,
            right: black,
        }
    }
    for(let i of inside){
        i.border = {
            top: white,
            left: white,
            bottom: white,
            right: white,
        }
    }

    //导出下载
    const buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer])
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.download = "详细报表.xlsx";
    link.click();
    document.body.removeChild(link);
}

export async function getExcelDemo3(StatisticsData){
    //创建工作簿↓
    const workbook = new ExcelJS.Workbook();
    //设置工作簿属性↓
    workbook.creator = '中国地震局信息管理系统';
    // workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    //工作簿视图 ？？啥玩意
    workbook.views = [{
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible'
        }]
        //添加工作表
    const sheet = workbook.addWorksheet('1');
    // 设置padding 列宽
    sheet.getColumn('A').width = 1.88
    let col_i = 'BCDE'
    for (let i = 0; i < col_i.length; i++) {
        sheet.getColumn(col_i[i]).width = 13
    }
    //样式
    const content_row = { vertical: 'middle', horizontal: 'center' };
    const table_header2 = {
        name: 'Arial Black',
        color: { argb: '000' },
        family: 2,
        size: 14,
        bold: true,
    };
    const table_header3 = {
        name: 'Black',
        color: { argb: '000' },
        family: 2,
        size: 14,
        bold: false,
    };
    const black = { style: 'medium', color: { argb: '000' } }

    // 第2到n行
    let name_list = [
        '名称',
        '总设备数量(台)',
        '总设备类型(种)',
        '保修期内设备数量(台)',
        '总应用系统数量(台)',
        '应用管理员数量(个)',
        '设备管理员数量(个)'
    ]
    let B2 = []
    for (let i in name_list){
        let item_list = []
        let num = 2 + parseInt(i) 
        if(i == 0){
            sheet.getRow(num).height = 30
        }else{
            sheet.getRow(num).height = 25.5
        }
        sheet.mergeCells('B'+num+':C'+num);
        sheet.mergeCells('D'+num+':E'+num);
        item_list.push(sheet.getCell('B'+num))
        item_list.push(sheet.getCell('D'+num))
        for(let cell in item_list){
            if(cell == 0){
                item_list[cell].value = name_list[i]
            }
            if(i == 0 && cell == 1){
                item_list[cell].value = '数量'
            }else if(cell == 1){
                item_list[cell].value = StatisticsData[i-1]
            }
            if(i == 0){
                item_list[cell].font = table_header2
            }else{
                item_list[cell].font = table_header3
            }
            item_list[cell].alignment = content_row
            item_list[cell].border = {
                top: black,
                left: black,
                bottom: black,
                right: black,
            }
        }
        B2.push(item_list)
        
    }

    //导出下载
    const buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer])
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.download = "统计报表.xlsx";
    link.click();
    document.body.removeChild(link);
}