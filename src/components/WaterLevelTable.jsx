import React from 'react';

import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';


const db = StartFirebase();




    export class WaterLevelTable extends React.Component{

        constructor(){
            super();
            this.state = {
                tableData: []
                
            }
            
        }
    
        componentDidMount() {
            // Reference the root of the database
            const dbRef = ref(db);
        
            onValue(dbRef, (snapshot) => {
                let records = [];
        
                snapshot.forEach((childSnapshot) => {
                    let keyName = childSnapshot.key;
                    let data = childSnapshot.val();
                    records.push({ "key": keyName, "data": data });
                });
        
                this.setState({ tableData: records });
            });
        
        }



        render()
    {
        
  return (
    <div >
    <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>
          Water Level
        </p>
      </div>
      <hr className='my-2' />
    <div className='flex flex-col items-start justify-start text-white py-3'>
      
      
      



    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-white uppercase bg-blue-500">
    <tr>
      <th scope="col" className="px-6 py-3"> {/* Increased px value */}
        Date
      </th>
      <th scope="col" className="px-6 py-3"> {/* Increased px value */}
        Time
      </th>
      <th scope="col" className="px-6 py-3"> {/* Increased px value */}
        Status
      </th>
    </tr>
  </thead>
  <tbody>
    {this.state.tableData.map((row) => {
      return (
        <tr className="border-b border-gray-700 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
            <th scope="row" className="px-6 py-4"> {/* Increased px value */}
                {row.key.split(" ")[0]}
            </th>
            <td className="px-6 py-4"> {/* Increased px value */}
                {row.key.split(" ")[1]}
            </td>
            <td className={`px-6 py-4 ${row.data.Status === 'LOW' ? 'bg-yellow-300' : row.data.Status === 'MODERATE' ? 'bg-orange-300' : row.data.Status === 'HIGH' ? 'bg-red-300 ' : ''}`}> {/* Conditional background color based on status */}
                {row.data.Status}
            </td>

        </tr>
      );
    })}
  </tbody>
</table>

</div>


    </div>
    </div>
  );
} 

}

export default WaterLevelTable;
