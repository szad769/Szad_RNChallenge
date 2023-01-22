import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {fetchPostOfficeByCityName} from '../service/postOfficeList/PostOfficeService';
import {WEB_SERVICE_STATUS} from '../service/networkConstant/Constant';

const SearchPostOffice = props => {
    const [searchText, setSearchText] = useState('');
    const [postOfficeList, setPostOfficeList] = useState(null);
    const [networkStatus, setNetworkStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const netWorkInfo = useRef(null);

    useEffect(() => {
        netWorkInfo.current =  NetInfo.addEventListener(state => {
            setNetworkStatus(state.isConnected);
          }); 
        return function cleanup() {
            if(netWorkInfo.current !== undefined && netWorkInfo.current !== null){
                let mNetworkUnsubscriber = netWorkInfo.current;
                mNetworkUnsubscriber()
            }
            
          };
    }, []);

    const renserPostOfficeListItem = ({item, index}) => {

        return(
            <View style={styles.listItemContainer}>
                 <Text style={styles.postOfficeName}>
                        {item.name}
                    </Text>
                    <Text style={styles.branchType}>
                        {item.branchType}
                    </Text>
                    <Text style={styles.state}>
                        {item.state}
                    </Text>
                    <Text style={styles.pincode}>
                        {item.pinCode}
                    </Text>   
                
            </View>
        )
    }

    const searchPostOfficeHandler = () => {
        if (networkStatus) {
            if(searchText !== ''){
                setLoading(true)
                fetchPostOfficeByCityName(searchText)
                .then(res => {
                    setPostOfficeList(res)
                    setLoading(false)
                })
                .catch(err => {
                    setPostOfficeList(err)
                    setLoading(false)
                });
            }  
        }
        else {
            Alert.alert('Alert', 'Seems, Network Connection is not available')
        }

    }
    return (
        <View style={styles.parentContainer}>

            <View style={styles.elementContainer}>
                <View style={styles.searchSectionContainer}>
                    <View style={styles.inputBoxWrapper}>
                        <TextInput
                            style={styles.inputFied}
                            value={searchText}
                            onChangeText={text => setSearchText(text)}
                            numberOfLines={1}
                        />
                    </View>
                    <TouchableOpacity 
                    style={styles.searchButttonWrapper}
                    onPress={searchPostOfficeHandler}
                    >
                        <Text style={styles.searchButton}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoConatiner}>
                { 
                        loading === true ?
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#000" />
                                <Text>Fetching Record....</Text>
                            </View>
                            :
                            postOfficeList !== null && postOfficeList.error !== '' ?
                                <View
                                    style={styles.errorContainer}
                                >
                                    <Text style={styles.errorLabel}>
                                    {
                                    postOfficeList.error === WEB_SERVICE_STATUS.noRecordFound ? 'No Record Found' : postOfficeList.error === WEB_SERVICE_STATUS.errorInFetching ? 'Error in fetching record. Try Again' : ''}  
                                    </Text>
                                </View>
                                :
                                <FlatList
                                    renderItem={renserPostOfficeListItem}
                                    data={postOfficeList === null ? [] : postOfficeList.postOfficeList}
                                    ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
                                />
                    
                    }
               
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      flex: 1,
      flexDirection:'column'
    },
elementContainer:{ 
    flex: 1 
},
 searchSectionContainer: {
     flexDirection: 'row' 
    },
inputBoxWrapper: { 
    borderWidth: 1, 
    borderRadius: 5, 
    borderColor: 'grey', 
    height: 50, 
    flex: 1 
},
inputFied: { 
    marginVertical: 10, 
    paddingVertical: 7, 
    paddingHorizontal: 5 
},
searchButttonWrapper:{ 
    backgroundColor: 'grey', 
    width: 60, 
    height: 50, 
    marginHorizontal: 5, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
searchButton: 
{ 
    color: 'white' 
},
postOfficeName:{
    fontSize: 18,
    fontWeight:'700',
    color: 'black',
},
branchType:{
    fontSize: 18,
    fontWeight:'500',
    color: 'black',
},
state:{
    fontSize: 18,
    fontWeight:'300',
    color: 'black',
},
pincode:{
    fontSize: 18,
    fontWeight:'300',
    color: 'black',
},
infoConatiner: { 
    flex: 1, 
    paddingVertical: 10
},
listItemContainer:{
    backgroundColor:'#d3d3d3', 
    paddingVertical: 7, 
    paddingHorizontal:5
},
listItemSeparator:
 {
    height: 5, 
    width:'100%'
},
errorLabel: 
{ 
    color: 'black',
    fontSize: 20,
    fontWeight: '700'
},
loaderContainer:{ 
    alignItems: 'center', 
    justifyContent: 'center', 
    alignSelf: 'center',
    marginTop: 30
},
errorContainer: { 
    alignItems: 'center' ,
    marginTop: 30
}
  });
  
  export default SearchPostOffice;