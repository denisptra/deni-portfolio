import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RISE Dashboard',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  static const List<Widget> _pages = <Widget>[
    DashboardPage(),
    TasksPage(),
    ProjectsPage(),
    CalendarPage(),
    DailyPage(),
    RemindersPage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('RISE Dashboard')),
      body: Center(child: _pages.elementAt(_selectedIndex)),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.check_box), label: 'Tasks'),
          BottomNavigationBarItem(icon: Icon(Icons.folder), label: 'Projects'),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: 'Calendar'),
          BottomNavigationBarItem(icon: Icon(Icons.today), label: 'Daily'),
          BottomNavigationBarItem(icon: Icon(Icons.alarm), label: 'Reminders'),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blueAccent,
        onTap: _onItemTapped,
      ),
    );
  }
}

class DashboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Text('Dashboard');
}

class TasksPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Text('Tasks');
}

class ProjectsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Text('Projects');
}

class CalendarPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Text('Calendar');
}

class DailyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Text('Daily');
}

class RemindersPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Text('Reminders');
}
