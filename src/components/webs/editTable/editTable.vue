<template>
  <d2-container>
    <editTable1></editTable1>
    <el-divider></el-divider>
    <editTable2></editTable2>
    <el-divider></el-divider>
    <editTable3></editTable3>
    <el-divider></el-divider>
    <editTable4></editTable4>
    <el-divider></el-divider>
  </d2-container>
</template>

<script>
import editTable1 from '@/components/webs/editTable/editTable1'
import editTable2 from '@/components/webs/editTable/editTable2'
import editTable3 from '@/components/webs/editTable/editTable3'
import editTable4 from '@/components/webs/editTable/editTable4'
export default {
  components: {
    editTable1,
    editTable2,
    editTable3,
    editTable4,
  }
};
</script>
<style lang="scss" scoped></style>