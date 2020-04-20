import XLSX from 'xlsx/dist/xlsx.full.min';

class ExcelOutputMan {
  sheet2blob = (sheet, sheetName = 'sheet1') => {
    const workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;

    // 生成excel的配置项
    const wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    };

    const wbout = XLSX.write(workbook, wopts);
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    });

    // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  }

  openDownloadDialog = (url, saveName) =>  {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
  }

  outPut = ({
    header = [],
    data = [],
    name = ''
  }) => {
    // 格式如下:
    // var _data = [
    //   ['姓名', '性别', '年龄', '注册时间'],
    //   ['张三', '男', 18, new Date()],
    //   ['李四', '女', 22, new Date()]
    // ];
    const _data = [
      header,
      ...data
    ];
    const sheet = XLSX.utils.aoa_to_sheet(_data);
    this.openDownloadDialog(this.sheet2blob(sheet), `${name}.xlsx`);
  }
}

export default new ExcelOutputMan();