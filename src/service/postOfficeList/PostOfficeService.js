import axios from 'axios';

import {postOfficeListResponseHandler} from '../postOfficeList/PostOfficeListResponseHandler';
import {BASE_URL, WEB_SERVICE_STATUS} from '../networkConstant/Constant';
import {PostOfficeListModel} from '../../screen/PostOfficeListModel';

/**
 * 
 * @param {name of city} name 
 * @returns Promise which resolve or reject with PostOfficeListModel
 */
export const fetchPostOfficeByCityName = name => {

   return new Promise((resolve, reject) => {
    let mPostOfficeListModel = new PostOfficeListModel();
    let mUrl = `${BASE_URL}${name}`
    axios.get(mUrl)
    .then(res => {
        postOfficeListResponseHandler(res, mPostOfficeListModel)
        resolve(mPostOfficeListModel)
    })
    .catch(err => {
        mPostOfficeListModel.error = WEB_SERVICE_STATUS.errorInFetching;
        reject(mPostOfficeListModel)
    })

    })
}