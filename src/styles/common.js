import { StyleSheet } from 'react-native'
// colors
const themeColor = '#00639c'; const blackColor = '#000000'; const greyColor = '#cccccc'; const darkGreyColor = '#aaa'; const errColor = '#dc3545'; const whiteColor = '#fff'
// sizes
const fs12 = 12; const fs14 = 14; const fs23 = 23; const fs25 = 25;
const five = 5; const fifteen = 15; const ten = 10; const twenty = 20; const thirty = 30; const forty = 40; const fifty = 50;

export default StyleSheet.create({
    content: { paddingHorizontal: 20 },
    // Helper styles
    blueBg: { backgroundColor: themeColor },
    content: { paddingHorizontal: thirty },
    h1: { color: whiteColor, fontWeight: 'bold', marginBottom: twenty, marginTop: thirty },
    dFlex: { display: 'flex' }, fBold: { fontWeight: 'bold' }, whiteTxt: { color: whiteColor },
    flex1: { flex: 1 },
    dFlexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    roundedButton: { borderRadius: 15, backgroundColor: whiteColor, width: fifty, height: fifty, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fs20: { fontSize: twenty },
    fs23: { fontSize: fs23 },
    fs25: { fontSize: fs25 },
    p10: { padding: ten },
    ph10: { paddingHorizontal: ten },
    mb10: { marginBottom: ten }, mb20: { marginBottom: twenty }, mb40: { marginBottom: forty },
    mt10: { marginTop: ten }, mt20: { marginTop: twenty }, mt30: { marginTop: thirty }, ml20: { marginLeft: twenty },
    logo: { width: 40, resizeMode: 'contain' },
    common: { backgroundColor: greyColor },
    image: { height: 220, width: 220 },
    activeIcon: { color: themeColor, fontSize: fs23 },
    icon: { color: blackColor, fontSize: fs23 },
    input: { color: blackColor, fontSize: fs14 },
    redColor: { color: 'red' },
    themeColor: { color: themeColor },
    error: { fontSize: fs14, alignSelf: 'center', color: errColor },
    noData: { fontSize: fs14, alignSelf: 'center', marginTop: 20 },
    // Post styles
    postMenuOptions: {
        // position: 'absolute', top: -40, right: -10,
        paddingVertical: 6, shadowColor: '#ddd', shadowOpacity: 0.7, borderColor: '#aaa',
        borderStyle: 'solid', borderWidth: 1, backgroundColor: '#fff'
    },
    postMenuOption: {borderColor: darkGreyColor, borderStyle: 'solid',
        backgroundColor: whiteColor,flexDirection: 'row', justifyContent: 'flex-start', 
        paddingVertical: 8, paddingHorizontal: 20
    },
    postMenuLink: { alignSelf: 'center', color: '#333', fontSize: 18, fontSize: 16, paddingLeft: 10 },
    moreMenuWrap: {paddingVertical: 7,
        position: 'absolute', top: 43, right: 10, backgroundColor: '#fff',
        shadowColor: '#ddd', shadowOpacity: 0.25, shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 }, elevation: 5, borderColor: '#ddd', borderWidth: 1, borderStyle: 'solid'
    },
    triangle: {
        width: 10, height: 10, position: "absolute", top: -10, right: 12,
        borderLeftWidth: 10, borderLeftColor: "transparent",
        borderRightWidth: 10, borderRightColor: "transparent",
        borderBottomWidth: 10, borderBottomColor: "#ddd"
    },
    triangle2: {
        width: 10, height: 10, position: "absolute", top: -10, right: 13,
        borderLeftWidth: 9, borderLeftColor: "transparent",
        borderRightWidth: 9, borderRightColor: "transparent",
        borderBottomWidth: 9, borderBottomColor: "#fff"
    },
    // Comment Footer
    commentFooter: { backgroundColor: whiteColor },
    footerItem: { width: '100%', backgroundColor: '#ccc', paddingHorizontal: ten, marginBottom: five },
    commentFooterImage: { width: 22, height: 22 },
    childCommentFooterImage: { width: 16, height: 16 },
    // Image Upload
    uploadAvatar: { width: '100%' },
    image: { height: 100, width: 100 },
    userImage: { height: 250, width: 250, borderRadius: 250 },
    imageBox: { backgroundColor: whiteColor, width: 250, height: 250, alignSelf: 'center', borderRadius: 250, marginTop: thirty, marginBottom: twenty, justifyContent: 'center', alignItems: 'center' },
    // Profile
    profileIconBtn: { borderWidth: 1, borderColor: '#000000', paddingHorizontal: ten, borderRadius: five, paddingVertical: five },
    // hashTag styles
    hashTagItem: { flexDirection: 'row', marginBottom: fifteen },
    hashTagText: { fontSize: 23, color: blackColor, fontWeight: 'bold', marginLeft: fifteen },
    hashTagSub: { marginLeft: twenty, color: darkGreyColor },
    // Dropdown Menu styles - comment
    menuOption: {
        paddingVertical: 25, paddingHorizontal: 20, borderColor: darkGreyColor, borderStyle: 'solid',
        borderBottomWidth: 1, backgroundColor: greyColor, width: '100%', height: 45,
        textAlign: 'center', alignItems: 'center', justifyContent: 'center'
    },
    menuText: { alignSelf: 'center', color: themeColor, fontSize: 18, paddingVertical: 25 }

})










