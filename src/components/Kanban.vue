<template>
  <div class="app">
    <div class="fluid container">
      <div class="form-group form-group-lg panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title" style="text-align: center">Cockpit kanban</h3>
        </div>
      </div>

      <div class="colon">
        <div id="title">
          <h1 contenteditable="true">
            {{title}}
          </h1>
        </div>
        <draggable :move="onMove" :options="dragOptions" @end="isDragging=false" @start="isDragging=true" class="list-group"
                   element="ul" v-model="list">
          <transition-group :name="'flip-list'" type="transition">
            <li :key="element.order" class="list-group-item" v-for="element in list">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                 @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
            </li>
          </transition-group>
        </draggable>
      </div>

      <div class="colon">
        <div id="title">
          <h1 contenteditable="true">
            {{title2}}
          </h1>
        </div>
        <draggable :move="onMove" :options="dragOptions" element="span" v-model="list2">
          <transition-group class="list-group" name="no" tag="ul">
            <li :key="element.order" class="list-group-item" v-for="element in list2">
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                 @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
            </li>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>

</template>

<script>
  import draggable from 'vuedraggable'

  const message = {
    title: 'Todo',
    data: [
      'vue.draggable',
      'draggable',
      'component',
      'for',
      'vue.js 2.0',
      'based',
      'on',
      'Sortablejs'
    ]
  }

  const message2 = {
    title: 'Current',
    data: [
      'test1'
      ,
      'test2'
    ]
  }
  export default {
    name: 'Kanban',
    components: {
      draggable
    },
    data () {
      return {
        title: message.title,
        list: message.data.map((name, index) => {
          return {name, order: index + 1, fixed: false}
        }),
        title2: message2.title,
        list2: message2.data.map((name, index) => {
          return {name, order: index + 1, fixed: false}
        }),
        editable: true,
        isDragging: false,
        delayedDragging: false
      }
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element
        const draggedElement = draggedContext.element
        return (
          (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        )
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'ghost'
        }
      },
      listString () {
        return JSON.stringify(this.list, null, 2)
      },
      list2String () {
        return JSON.stringify(this.list2, null, 2)
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      }
    }
  }
</script>

<style>
  .colon {
    width: 220px;
    float: left;
    margin: 0 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  ul {
    padding: 0;
    list-style-type: none;
  }

  .list-group {
    min-height: 20px;
    padding: 0 5px;
    list-style-type: none;
    align-content: center;
  }

  .list-group-item {
    cursor: move;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 10px 16px;
    margin: 10px;

  }

  .list-group-item i {
    cursor: pointer;
  }

  /* On mouse-over, add a deeper shadow */
  .list-group-item:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  #title {
    text-align: center;
    margin: 0;
  }
</style>
