type TProfile = {
    id: number;
    fullname: string;
    age: number;
    gender: string;
    email?: string;
    password: string;
}
let myProfile: TProfile  =  {
    id: 1,
    fullname: 'Nhan',
    age: 38,
    gender: 'male',
    password: '123'
}
//console.log(myProfile.fullname);
const {fullname} = myProfile;
console.log(fullname);
//myProfile.fullname ='Nhân'
// --> update giá trị mới cho thuộc tính
myProfile = {...myProfile, fullname: 'Nhân'}
console.log('<<=== 🚀 myProfile ===>>',myProfile);
//myProfile.email = 'email';
myProfile = {...myProfile, email: 'email'}
console.log('<<=== 🚀 myProfile ===>>',myProfile);
// bóc tách password
const {password, ...userInfo} = myProfile;
console.log('<<=== 🚀 password, userInfo ===>>',password, userInfo);