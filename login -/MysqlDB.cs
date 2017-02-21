using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ESAdmin
{
    public static class MysqlDB
    {
        static string connStr;
        static MysqlDB()
        {
            try
            {
                connStr = ConfigurationManager.ConnectionStrings["GameLog"].ConnectionString;
            }
            catch (Exception)
            {
                connStr = "server=192.168.10.30;user id='';password='';persistsecurityinfo=True;port=33060;database=login";
            }
        }

        public static async Task<MySqlConnection> CreateConnection()
        {
            var conn = new MySqlConnection(connStr);
            await conn.OpenAsync();
            return conn;
        }

        public static void SetField(this MySqlDataReader reader, object target)
        {
            IEnumerable<MemberInfo> pInfos = target.GetType().GetMembers().Where(m => (/*m is PropertyInfo ||*/ (m is FieldInfo && ((FieldInfo)m).IsPublic)));
            HashSet<string> columns = new HashSet<string>(reader.GetSchemaTable().Select().Select(r => r.Field<string>("ColumnName")));
            foreach (FieldInfo pi in pInfos)
            {
                if (columns.Contains(pi.Name))
                {
                    object val = reader[pi.Name];
                    //if (pi is PropertyInfo)
                    pi.SetValue(target, val is DBNull ? null : val);
                    //else
                    //    ((FieldInfo)pi).SetValue(target, val is DBNull ? null : val);
                }
            }
        }
    }
}
