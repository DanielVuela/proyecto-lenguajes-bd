-- USER SQL
CREATE USER "LISTIFY" IDENTIFIED BY "LISTIFY"  
DEFAULT TABLESPACE "USERS"
TEMPORARY TABLESPACE "TEMP";

-- QUOTAS
ALTER USER "LISTIFY" QUOTA UNLIMITED ON "USERS";

-- ROLES
GRANT "DBA" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_MONITOR" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "CTXAPP" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_AUDIT_CLEANUP" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "EM_EXPRESS_ALL" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "WM_ADMIN_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "OLAP_USER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "OLAP_XS_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_SECANALYST" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "RECOVERY_CATALOG_OWNER_VPD" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XS_CACHE_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GDS_CATALOG_SELECT" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "SCHEDULER_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "PROVISIONER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "AUDIT_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XDB_WEBSERVICES_OVER_HTTP" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_REALM_RESOURCE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "AQ_ADMINISTRATOR_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "SYSUMF_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "APPLICATION_TRACE_VIEWER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XDB_WEBSERVICES" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_PUBLIC" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "LBAC_DBA" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "OPTIMIZER_PROCESSING_RATE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "RECOVERY_CATALOG_USER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_DATAPUMP_NETWORK_LINK" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GSMUSER_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GATHER_SYSTEM_STATISTICS" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "LOGSTDBY_ADMINISTRATOR" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DBJAVASCRIPT" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GSM_POOLADMIN_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_POLICY_OWNER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "HS_ADMIN_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XS_SESSION_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_GOLDENGATE_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "IMP_FULL_DATABASE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_XSTREAM_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_PATCH_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GGSYS_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DATAPUMP_EXP_FULL_DATABASE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "EJBCLIENT" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "HS_ADMIN_EXECUTE_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "JMXSERVER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "OLAP_DBA" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "ADM_PARALLEL_EXECUTE_TASK" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "JAVAIDPRIV" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "SELECT_CATALOG_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "JAVADEBUGPRIV" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "CONNECT" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DATAPUMP_IMP_FULL_DATABASE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "SODA_APP" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "BDSQL_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "OEM_MONITOR" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GSMADMIN_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "AQ_USER_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "JAVAUSERPRIV" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XDB_SET_INVOKER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "RECOVERY_CATALOG_OWNER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "JAVA_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DBFS_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "PDB_DBA" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "RDFCTX_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_GOLDENGATE_REDO_ACCESS" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "CDB_DBA" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "JAVASYSPRIV" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "GSMROOTUSER_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "HS_ADMIN_SELECT_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "AUDIT_VIEWER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "RESOURCE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_OWNER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XDB_WEBSERVICES_WITH_PUBLIC" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "EXECUTE_CATALOG_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DATAPATCH_ROLE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_ACCTMGR" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_REALM_OWNER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "EXP_FULL_DATABASE" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DBMS_MDX_INTERNAL" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "DV_STREAMS_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XS_NAMESPACE_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "BDSQL_USER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "ORDADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "AUTHENTICATEDUSER" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "CAPTURE_ADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "OEM_ADVISOR" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XS_CONNECT" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "XDBADMIN" TO "LISTIFY" WITH ADMIN OPTION;
GRANT "EM_EXPRESS_BASIC" TO "LISTIFY" WITH ADMIN OPTION;
ALTER USER "LISTIFY" DEFAULT ROLE "DBA","DV_MONITOR","CTXAPP","DV_AUDIT_CLEANUP","EM_EXPRESS_ALL","WM_ADMIN_ROLE","OLAP_USER","OLAP_XS_ADMIN","DV_SECANALYST","RECOVERY_CATALOG_OWNER_VPD","XS_CACHE_ADMIN","GDS_CATALOG_SELECT","SCHEDULER_ADMIN","PROVISIONER","AUDIT_ADMIN","XDB_WEBSERVICES_OVER_HTTP","DV_REALM_RESOURCE","AQ_ADMINISTRATOR_ROLE","SYSUMF_ROLE","APPLICATION_TRACE_VIEWER","XDB_WEBSERVICES","DV_PUBLIC","LBAC_DBA","OPTIMIZER_PROCESSING_RATE","RECOVERY_CATALOG_USER","DV_DATAPUMP_NETWORK_LINK","GSMUSER_ROLE","GATHER_SYSTEM_STATISTICS","LOGSTDBY_ADMINISTRATOR","DBJAVASCRIPT","GSM_POOLADMIN_ROLE","DV_ADMIN","DV_POLICY_OWNER","HS_ADMIN_ROLE","XS_SESSION_ADMIN","DV_GOLDENGATE_ADMIN","IMP_FULL_DATABASE","DV_XSTREAM_ADMIN","DV_PATCH_ADMIN","GGSYS_ROLE","DATAPUMP_EXP_FULL_DATABASE","EJBCLIENT","HS_ADMIN_EXECUTE_ROLE","JMXSERVER","OLAP_DBA","ADM_PARALLEL_EXECUTE_TASK","JAVAIDPRIV","SELECT_CATALOG_ROLE","JAVADEBUGPRIV","CONNECT","DATAPUMP_IMP_FULL_DATABASE","SODA_APP","BDSQL_ADMIN","OEM_MONITOR","GSMADMIN_ROLE","AQ_USER_ROLE","JAVAUSERPRIV","XDB_SET_INVOKER","RECOVERY_CATALOG_OWNER","JAVA_ADMIN","DBFS_ROLE","PDB_DBA","RDFCTX_ADMIN","DV_GOLDENGATE_REDO_ACCESS","CDB_DBA","JAVASYSPRIV","GSMROOTUSER_ROLE","HS_ADMIN_SELECT_ROLE","AUDIT_VIEWER","RESOURCE","DV_OWNER","XDB_WEBSERVICES_WITH_PUBLIC","EXECUTE_CATALOG_ROLE","DATAPATCH_ROLE","DV_ACCTMGR","DV_REALM_OWNER","EXP_FULL_DATABASE","DBMS_MDX_INTERNAL","DV_STREAMS_ADMIN","XS_NAMESPACE_ADMIN","BDSQL_USER","ORDADMIN","AUTHENTICATEDUSER","CAPTURE_ADMIN","OEM_ADVISOR","XS_CONNECT","XDBADMIN","EM_EXPRESS_BASIC";

-- SYSTEM PRIVILEGES
GRANT CREATE JOB TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT UPDATE ANY CUBE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY ANALYTIC VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY TRIGGER TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY SQL TRANSLATION PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT MANAGE ANY FILE GROUP TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER PUBLIC DATABASE LINK TO "LISTIFY" WITH ADMIN OPTION;
GRANT MANAGE FILE GROUP TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY INDEX TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY SEQUENCE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT INHERIT ANY PRIVILEGES TO "LISTIFY" WITH ADMIN OPTION;
GRANT UNDER ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT KEEP SYSGUID TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ASSEMBLY TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY LIBRARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY EDITION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ROLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE LIBRARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ROLLBACK SEGMENT TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE TRIGGER TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY PROCEDURE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADMINISTER DATABASE TRIGGER TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY PROCEDURE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY OUTLINE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY ANALYTIC VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY INDEXTYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT USE ANY JOB RESOURCE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY DIRECTORY TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY RULE SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT USE ANY SQL TRANSLATION PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY MINING MODEL TO "LISTIFY" WITH ADMIN OPTION;
GRANT DEBUG CONNECT SESSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT LOGMINING TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY ATTRIBUTE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY MINING MODEL TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE LOCKDOWN PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER SESSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE MATERIALIZED VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE PLUGGABLE DATABASE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY ANALYTIC VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT WRITE ANY ANALYTIC VIEW CACHE TO "LISTIFY" WITH ADMIN OPTION;
GRANT MERGE ANY VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY INDEX TO "LISTIFY" WITH ADMIN OPTION;
GRANT READ ANY ANALYTIC VIEW CACHE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY RULE SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE SQL TRANSLATION PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY MATERIALIZED VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT AUDIT SYSTEM TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE OPERATOR TO "LISTIFY" WITH ADMIN OPTION;
GRANT MANAGE ANY QUEUE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY SQL PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT GRANT ANY OBJECT PRIVILEGE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE INDEXTYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT AUDIT ANY TO "LISTIFY" WITH ADMIN OPTION;
GRANT INHERIT ANY REMOTE PRIVILEGES TO "LISTIFY" WITH ADMIN OPTION;
GRANT SYSKM TO "LISTIFY" WITH ADMIN OPTION;
GRANT DEBUG ANY PROCEDURE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY SEQUENCE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT UPDATE ANY CUBE BUILD PROCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER DATABASE LINK TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY ASSEMBLY TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY SQL TRANSLATION PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY EVALUATION CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY MINING MODEL TO "LISTIFY" WITH ADMIN OPTION;
GRANT DELETE ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY ATTRIBUTE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE SESSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE RULE TO "LISTIFY" WITH ADMIN OPTION;
GRANT BECOME USER TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY CUBE BUILD PROCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT INSERT ANY MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY SQL PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT FORCE ANY TRANSACTION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DELETE ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY SEQUENCE TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY EDITION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE EXTERNAL JOB TO "LISTIFY" WITH ADMIN OPTION;
GRANT EM EXPRESS CONNECT TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY MATERIALIZED VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY CUBE BUILD PROCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT FLASHBACK ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY RULE SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT BACKUP ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY CUBE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE CREDENTIAL TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY LIBRARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY OUTLINE TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ASSEMBLY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY HIERARCHY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANALYTIC VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADMINISTER KEY MANAGEMENT TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY CLUSTER TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY CLASS TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY CUBE BUILD PROCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY CREDENTIAL TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT SYSBACKUP TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY RULE SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY SEQUENCE TO "LISTIFY" WITH ADMIN OPTION;
GRANT UNDER ANY TYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT MANAGE TABLESPACE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY OPERATOR TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY OPERATOR TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY HIERARCHY TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXEMPT IDENTITY POLICY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE TYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE TABLESPACE TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY TRANSACTION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DELETE ANY MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY CUBE TO "LISTIFY" WITH ADMIN OPTION;
GRANT LOCK ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE EVALUATION CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY TYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADVISOR TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE PUBLIC DATABASE LINK TO "LISTIFY" WITH ADMIN OPTION;
GRANT ANALYZE ANY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ATTRIBUTE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY RULE TO "LISTIFY" WITH ADMIN OPTION;
GRANT INSERT ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ROLLBACK SEGMENT TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY JOB TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER USER TO "LISTIFY" WITH ADMIN OPTION;
GRANT QUERY REWRITE TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY DICTIONARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE PUBLIC SYNONYM TO "LISTIFY" WITH ADMIN OPTION;
GRANT GLOBAL QUERY REWRITE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY CLUSTER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY RULE TO "LISTIFY" WITH ADMIN OPTION;
GRANT UPDATE ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT SYSDBA TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADMINISTER RESOURCE MANAGER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY SYNONYM TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY SYNONYM TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY MINING MODEL TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY PROCEDURE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE SYNONYM TO "LISTIFY" WITH ADMIN OPTION;
GRANT SET CONTAINER TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY PROGRAM TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXEMPT REDACTION POLICY TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY TYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ON COMMIT REFRESH TO "LISTIFY" WITH ADMIN OPTION;
GRANT DEBUG CONNECT ANY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE SEQUENCE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE HIERARCHY TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT COMMENT ANY MINING MODEL TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADMINISTER SQL TUNING SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT SYSOPER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY INDEXTYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT KEEP DATE TIME TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY INDEX TO "LISTIFY" WITH ADMIN OPTION;
GRANT RESTRICTED SESSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT SYSDG TO "LISTIFY" WITH ADMIN OPTION;
GRANT DEQUEUE ANY QUEUE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ANALYZE ANY DICTIONARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY INDEXTYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT TRANSLATE ANY SQL TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADMINISTER ANY SQL TUNING SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE USER TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY OPERATOR TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE CUBE BUILD PROCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY ROLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT UPDATE ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY LIBRARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY CLUSTER TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY RULE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER TABLESPACE TO "LISTIFY" WITH ADMIN OPTION;
GRANT UNDER ANY VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY ASSEMBLY TO "LISTIFY" WITH ADMIN OPTION;
GRANT GRANT ANY PRIVILEGE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY TRIGGER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER LOCKDOWN PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXPORT FULL DATABASE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY MEASURE FOLDER TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY EVALUATION CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT TEXT DATASTORE ACCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT FLASHBACK ARCHIVE ADMINISTER TO "LISTIFY" WITH ADMIN OPTION;
GRANT IMPORT FULL DATABASE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY OUTLINE TO "LISTIFY" WITH ADMIN OPTION;
GRANT COMMENT ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT READ ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE DATABASE LINK TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP PUBLIC SYNONYM TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP USER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CHANGE NOTIFICATION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE MINING MODEL TO "LISTIFY" WITH ADMIN OPTION;
GRANT INSERT ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP LOCKDOWN PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY MATERIALIZED VIEW TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE RULE SET TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXEMPT ACCESS POLICY TO "LISTIFY" WITH ADMIN OPTION;
GRANT MANAGE SCHEDULER TO "LISTIFY" WITH ADMIN OPTION;
GRANT READ ANY FILE GROUP TO "LISTIFY" WITH ADMIN OPTION;
GRANT FORCE TRANSACTION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY CUBE BUILD PROCESS TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY TYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY PROCEDURE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY SQL TRANSLATION PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP PUBLIC DATABASE LINK TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY INDEXTYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY SQL PROFILE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER SYSTEM TO "LISTIFY" WITH ADMIN OPTION;
GRANT UNLIMITED TABLESPACE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY ROLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY CUBE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY TRIGGER TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY ASSEMBLY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ADMINISTER SQL MANAGEMENT OBJECT TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY DIRECTORY TO "LISTIFY" WITH ADMIN OPTION;
GRANT ENQUEUE ANY QUEUE TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY EVALUATION CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY ASSEMBLY TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY TYPE TO "LISTIFY" WITH ADMIN OPTION;
GRANT REDEFINE ANY TABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE CLUSTER TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT EXECUTE ANY EVALUATION CONTEXT TO "LISTIFY" WITH ADMIN OPTION;
GRANT RESUMABLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY LIBRARY TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP ANY EDITION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE PROCEDURE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER DATABASE TO "LISTIFY" WITH ADMIN OPTION;
GRANT SELECT ANY CUBE TO "LISTIFY" WITH ADMIN OPTION;
GRANT GRANT ANY ROLE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY RULE TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE ANY ATTRIBUTE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE CUBE DIMENSION TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY OPERATOR TO "LISTIFY" WITH ADMIN OPTION;
GRANT CREATE CUBE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER RESOURCE COST TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ANY HIERARCHY TO "LISTIFY" WITH ADMIN OPTION;
GRANT DROP TABLESPACE TO "LISTIFY" WITH ADMIN OPTION;
GRANT ALTER ROLLBACK SEGMENT TO "LISTIFY" WITH ADMIN OPTION;
GRANT PURGE DBA_RECYCLEBIN TO "LISTIFY" WITH ADMIN OPTION;

commit;