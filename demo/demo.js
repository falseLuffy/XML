const str = "<?xml version='1.0' encoding='utf-8'?>\n" +
"<root >\n" +
"\t<dev nPclType=\"MODBUS\" nByteOrder=\"2\" nDevModel=\"ZGS11-2000\">\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" />\n" +
"fasdfafa"+
"\t</dev>\n" +
"\t<protocol nMinAddr=\"4\" nMaxAddr=\"65\" nDevCode=\"60100\" pDevModel=\"ZGS11-2000\" nDevType=\"OT_TRANS\" nByteOrder=\"2\">\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"油面温度\" nSigId=\"0X269B\" nModbusAddr=\"4\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"环境温度\" nSigId=\"0X2521\" nModbusAddr=\"5\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Ua\" nSigId=\"0X2000\" nModbusAddr=\"6\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Ub\" nSigId=\"0X2001\" nModbusAddr=\"7\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Uc\" nSigId=\"0X2002\" nModbusAddr=\"8\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Uab\" nSigId=\"0X2003\" nModbusAddr=\"9\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Ubc\" nSigId=\"0X2004\" nModbusAddr=\"10\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Uca\" nSigId=\"0X2005\" nModbusAddr=\"11\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Ia\" nSigId=\"0X2006\" nModbusAddr=\"12\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Ib\" nSigId=\"0X2007\" nModbusAddr=\"13\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Ic\" nSigId=\"0X2008\" nModbusAddr=\"14\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"3I0\" nSigId=\"0X200F\" nModbusAddr=\"15\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"F1\" nSigId=\"0X200B\" nModbusAddr=\"16\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"P1\" nSigId=\"0X2009\" nModbusAddr=\"17\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Q1\" nSigId=\"0X200A\" nModbusAddr=\"18\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"Cos1\" nSigId=\"0X200C\" nModbusAddr=\"19\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"0\" pExpInfo1=\"\" />\n" +
"\t\t<point nDevIndex=\"1\" nDevType=\"13\" nDevModel=\"SUN2000\" nDataName=\"开入量状态字1\" nSigId=\"0X2783\" nModbusAddr=\"65\" nRegNum=\"1\" nRqstCyl=\"1\" nRegType=\"1\" nEndInquire=\"2\" fInDexP=\"1\" nInDataType=\"4\" nExpNum=\"16\" pExpInfo3=\"0X26A9:In1and0X0004\" pExpInfo4=\"0X26AA:In1and0X0008\" />\n"+
"\t</protocol>\n" +
"<div>hello world</div>"+
"</root>"
console.log(str)
let json = XML.parse(str)
console.log(json)
let xml = XML.stringify(json)
console.log(xml)
let json2 = XML.parse(xml)
console.log(json2)

// let xml3 = XML.stringify(json2)
// console.log(xml3)

// let json3 = XML.parse(xml3)
// console.log(json3)
