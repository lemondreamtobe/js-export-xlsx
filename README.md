
## js-export-xlsx

> 基于xlsx提供一种简单的纯浏览器js的客户端导出xlsx表格的小工具

## 使用方式

```
import EXCEL from 'js-export-xlsx';

EXCEL.outPut({
  header: ['name', 'age', 'from'],
  data: [
    ['lemon', 25, 'china'],
    ['zhang', 25, 'guangzhou'],
  ],
  name: 'myExcel'
});
```

